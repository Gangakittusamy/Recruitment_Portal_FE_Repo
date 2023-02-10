import "./index.css"
import React, { useState, useEffect } from "react"
import { DragDropContext, DraggableLocation } from "react-beautiful-dnd"
import { v4 as uuidv4 } from "uuid"
import { ITEMS } from "../Constant/const"

import {
  dragAndDropValueSuperAdmin,
  formEditIdDragAndDrop,
  dragAndDropDialogIndexSuperAdmin,
  selectStructuredData
} from "../../features/counter/dragAndDrop"
import { useSelector, useDispatch } from "react-redux"
import NavBar from "./navBar"
import CreateForm from "./createForm"
import { useParams } from "react-router-dom"
import { newSectionIndexData } from "../../features/counter/dragAndDrop"
import { Button } from "primereact/button"
import _ from "lodash"

const copy = (
  source: Iterable<unknown> | ArrayLike<unknown>,
  destination: Iterable<unknown> | ArrayLike<unknown>,
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const item: any = sourceClone[droppableSource.index]

  destClone.splice(droppableDestination.index, 0, { ...item, id: uuidv4() })

  return destClone
}

const move = (
  source: Iterable<unknown> | ArrayLike<unknown>,
  destination: Iterable<unknown> | ArrayLike<unknown>,
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)
  destClone.splice(droppableDestination.index, 0, removed)
  const result: any = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}

const SuperAdmin = () => {
  const dispatch = useDispatch()
  const { editId } = useParams()
  const [id, setId] = useState()
  const [complete, setCompleted] = useState<any>({
    [uuidv4()]: []
  })
  const structureData = useSelector(selectStructuredData)
  const [indexId, setIndexId] = useState<any>()
  const count: any = useSelector((state) => state)

  useEffect(() => {
    if (window.location.pathname !== `/super-admin/edit/${editId}`) {
      setCompleted(count.dragAndDrop.initialStartDragSuperAdmin)
    }
  }, [count.dragAndDrop.initialStartDragSuperAdmin])

  const reorder = (
    list: Iterable<unknown> | ArrayLike<unknown>,
    startIndex: number,
    endIndex: number,
    res: any
  ) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    let app = Object.assign({}, complete)
    app[res] = result
    setCompleted(app)
    return result
  }

  const addList = () => {
    setCompleted({ ...complete, [uuidv4()]: [] })
    let lent = Object.keys(complete).length
    dispatch(newSectionIndexData(lent))
  }

  const applyFormChanges = () => {
    let currentForm: any = { ...complete }
    if (Object.keys(structureData).length > 0) {
      let currentFormElements: any = { ...complete }
      for (const key in currentFormElements) {
        const currentFormId = key
        const alteredFields = structureData[currentFormId]
        let currentFields = currentFormElements[currentFormId]

        if (alteredFields) {
          const result: any = currentFields.map((o1: any, i: any) => {
            if (alteredFields.some((o2: any) => o1.id === o2.inputIdValue)) {
              let alteredValue = alteredFields.find((f: any) => {
                return f.inputIdValue == currentFields[i].id
              })
              return {
                names: alteredValue.names,
                id: currentFields[i].id,
                subName: currentFields[i].subName
              }
            } else {
              return {
                names: currentFields[i].names,
                id: currentFields[i].id,
                subName: currentFields[i].subName
              }
            }
          })
          currentFormElements[key] = result
        }
      }
      currentForm = currentFormElements
      const sameArray = _.isEqual(complete, currentForm)
      if (!sameArray) {
        setCompleted(currentForm)
      }
    }
    return currentForm
  }

  useEffect(() => {
    if (window.location.pathname !== `/super-admin/edit/${editId}`) {
      const ModifiedForm = applyFormChanges()
      dispatch(dragAndDropValueSuperAdmin(ModifiedForm))
    }

    if (window.location.pathname === `/super-admin/edit/${editId}`) {
      const result = applyFormChanges()

      let totalValue = count.module?.rolesGetForms

      let value = Object.assign(
        {},
        totalValue ? totalValue[0]?.moduleelements : {}
      )
      const value1 = Object.assign({}, complete)

      let res1 = Object.keys(value)
      let res2 = Object.keys(value1)

      res1.map((x, i) => {
        if (i + 1 < res1.length && res2.length < res1.length) {
          let ab: any = [uuidv4()]
          complete[ab] = []
        }
      })

      dispatch(formEditIdDragAndDrop(res2))

      for (let key in value) {
        value[uuidv4()] = value[key]
        delete value[key]
      }

      let keyss = Object.keys(complete)
      let valuess = Object.values(value)

      let app: any = []
      valuess.map((x: any, i) => {
        x = x.map((y: any, o: number) => {
          return {
            names: y.type,
            subName: y.fieldname,
            id: uuidv4()
          }
        })
        app.push([x])
      })

      let resObj: any = {}
      keyss.map((ke: any, idx: any) => {
        if (app[idx] === undefined) {
          resObj[ke] = []
        } else {
          resObj[ke] = app[idx][0]
        }
      })

      let a1 = JSON.stringify(resObj)
      let a2 = JSON.stringify(complete)

      if (a1 !== a2) {
        if (a1.length > a2.length) {
          setCompleted(resObj)
          dispatch(dragAndDropValueSuperAdmin(resObj))
        }
        if (a2.length > a1.length) {
          const sameArray = _.isEqual(complete, result)
          if (!sameArray) {
            setCompleted(result)
            dispatch(dragAndDropValueSuperAdmin(result))
          }
        }
      }

      if (a1 === a2) {
        setCompleted(complete)
      }

      if (Object.keys(complete).length) {
        dispatch(dragAndDropValueSuperAdmin(result))
      }
    }
  }, [complete])

  const handleClick = (e: any) => {
    setId(e)
  }

  return (
    <div>
      <DragDropContext
        onDragEnd={(result) => {
          const { source, destination } = result
          if (!destination) {
            return
          }
          switch (source.droppableId) {
            case destination.droppableId:
              reorder(
                complete[source.droppableId],
                source.index,
                destination.index,
                destination.droppableId
              )
              break
            case "CHECKSUPERDRAGITEMS":
              setCompleted({
                ...complete,
                [destination.droppableId]: copy(
                  ITEMS,
                  complete[destination.droppableId],
                  source,
                  destination
                )
              })
              let indexOfDragable = result ? result.source.index : ""
              dispatch(dragAndDropDialogIndexSuperAdmin(indexOfDragable))
              setIndexId(indexOfDragable)
              break

            default:
              setCompleted(
                move(
                  complete[source.droppableId],
                  complete[destination.droppableId],
                  source,
                  destination
                )
              )
              break
          }
        }}
      >
        {window.location.pathname == "/super-admin/LayoutPage" ? (
          ""
        ) : (
          <NavBar handleClick={handleClick} />
        )}
        <div className="layout h-full">
          <div style={{ background: "#FAFAFB", height: "100vh" }}>
            <div className="mainContent">
              {window.location.pathname ==
              "/super-admin/Settings/Modules/layoutpage" ? (
                <CreateForm />
              ) : (
                ""
              )}

              {window.location.pathname == "/super-admin" ? (
                <h2 className=" flex align-items-center justify-content-center">
                  Dashboard
                </h2>
              ) : (
                ""
              )}
              {window.location.pathname == "/super-admin/create-form" ? (
                <>
                  <CreateForm />
                  <div className="w-4 -mt-8  flex justify-content-center">
                    <Button
                      label="+ Add New Section"
                      onClick={() => addList()}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
              {window.location.pathname == `/super-admin/edit/${editId}` ? (
                <>
                  <CreateForm />
                  <div className="w-4 -mt-8  flex justify-content-center">
                    <Button
                      label="+ Add New Section"
                      onClick={() => addList()}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  )
}
export default React.memo(SuperAdmin)
