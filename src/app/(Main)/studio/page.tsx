"use client";

import React, { useState, useEffect } from "react";

import html2canvas from "html2canvas";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import {
  Circle,
  Download,
  Folder,
  Plus,
  Redo,
  RotateCcw,
  Save,
  Square,
  Triangle,
  Undo,
  X,
} from "lucide-react";
import "react-resizable/css/styles.css";

import ModalPopup from "@/components/modals/ModalPopup";
import ToastyAlertContainer from "@/components/spinners/ToastyAlertContainer";
import { Button } from "@/components/buttons/Button";

import { toastAlert, ToastVarient } from "@/utils/toastAlertVariants";

type Shape = {
  id: number;
  type: "rectangle" | "circle" | "triangle";
  x: number;
  y: number;
  width: number;
  height: number;
};

export default function Canvas() {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [history, setHistory] = useState<Shape[][]>([]);
  const [redoStack, setRedoStack] = useState<Shape[][]>([]);
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const [savedProjects, setSavedProjects] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    string | "viewprojects" | "newProject"
  >("");
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    const savedShapes = localStorage.getItem("designShapes");
    if (savedShapes) setShapes(JSON.parse(savedShapes));
  }, []);

  useEffect(() => {
    localStorage.setItem("designShapes", JSON.stringify(shapes));
  }, [shapes]);

  useEffect(() => {
    const existingProjects = JSON.parse(
      localStorage.getItem("designProjects") || "{}"
    );
    setSavedProjects(Object.keys(existingProjects));
  }, [shapes]);

  // Create new Project
  const createNewProject = () => {
    setShapes([]);
  };

  // Open saved Project
  const openSavedProject = () => {
    setModalType("viewProjects");
    setIsModalOpen((prev) => !prev);
  };

  // Add shape
  const addShape = (type: "rectangle" | "circle" | "triangle") => {
    const padding = 20;
    const baseX = 50;
    const baseY = 50;

    const lastShape = shapes[shapes.length - 1];
    const newX = lastShape ? lastShape.x + lastShape.width + padding : baseX;
    const newY = lastShape ? lastShape.y + padding : baseY;
    const newShape: Shape = {
      id: Date.now(),
      type,
      x: newX,
      y: newY,
      width: 100,
      height: 100,
    };

    setHistory([...history, shapes]);
    setRedoStack([]);
    setShapes([...shapes, newShape]);
  };

  // Update shape
  const updateShapes = (newShapes: Shape[]) => {
    setHistory([...history, shapes]);
    setRedoStack([]);
    setShapes(newShapes);
  };

  // Resize shape
  const handleResize = (
    id: number,
    event: any,
    { size }: { size: { width: number; height: number } }
  ) => {
    updateShapes(
      shapes.map((shape) =>
        shape.id === id
          ? { ...shape, width: size.width, height: size.height }
          : shape
      )
    );
  };

  // Drag shape
  const handleDrag = (id: number, x: number, y: number) => {
    updateShapes(
      shapes.map((shape) => (shape.id === id ? { ...shape, x, y } : shape))
    );
  };

  // Undo
  const undo = () => {
    if (history.length > 0) {
      const previous = history.pop();
      setRedoStack([shapes, ...redoStack]);
      setShapes(previous || []);
      setHistory([...history]);
    }
  };

  // Redo
  const redo = () => {
    if (redoStack.length > 0) {
      const next = redoStack.shift();
      setHistory([...history, shapes]);
      setShapes(next || []);
      setRedoStack([...redoStack]);
    }
  };

  // Reset canvas
  const resetCanvas = () => {
    setHistory([...history, shapes]);
    setRedoStack([]);
    setShapes([]);
    localStorage.removeItem("designShapes");
  };

  // Save design
  const saveDesign = () => {
    const existingProjects = JSON.parse(
      localStorage.getItem("designProjects") || "{}"
    );

    if (currentProject) {
      existingProjects[currentProject] = shapes;
      localStorage.setItem("designProjects", JSON.stringify(existingProjects));
      toastAlert("Design updated successfully!", ToastVarient.SUCCESS);
    } else {
      setModalType("newProject");
      setIsModalOpen(true);
    }
  };

  // Save a new project
  const handleSaveProject = () => {
    if (!projectName.trim()) {
      toastAlert("Project name cannot be empty!", ToastVarient.ERROR);
      return;
    }

    const existingProjects = JSON.parse(
      localStorage.getItem("designProjects") || "{}"
    );

    if (existingProjects[projectName]) {
      toastAlert(
        "Project name already exists. Choose a different name.",
        ToastVarient.ERROR
      );
      return;
    }

    existingProjects[projectName] = shapes;
    localStorage.setItem("designProjects", JSON.stringify(existingProjects));
    setCurrentProject(projectName);
    setIsModalOpen(false);
    toastAlert("Design saved successfully!", ToastVarient.SUCCESS);
    setSavedProjects(Object.keys(existingProjects));
  };

  // Download design as PNG
  const downloadCanvasAsPNG = async () => {
    const canvasElement = document.getElementById("canvas-area");
    if (canvasElement) {
      const canvas = await html2canvas(canvasElement, {
        backgroundColor: "transparent",
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "design.png";
      link.click();
    }
  };

  // Load saved project
  const loadDesign = (projectName: string) => {
    const existingProjects = JSON.parse(
      localStorage.getItem("designProjects") || "{}"
    );
    if (existingProjects[projectName]) {
      setShapes(existingProjects[projectName]);
      setCurrentProject(projectName);
    }
  };

  // Delete saved project
  const deleteDesign = (projectName: string) => {
    const existingProjects = JSON.parse(
      localStorage.getItem("designProjects") || "{}"
    );
    delete existingProjects[projectName];
    localStorage.setItem("designProjects", JSON.stringify(existingProjects));
    alert("Design deleted!");
  };

  // Close modal popup
  const closeModalPopup = () => {
    setModalType("");
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between w-full min-h-[calc(100vh+120px)] 2xl:min-h-[calc(100vh-120px)] gap-4">
        <div className="relative flex flex-col sm:justify-between w-full sm:w-24 h-fit sm:h-full rounded-lg gap-4 p-4 bg-tc_black bg-opacity-40">
          <div className="flex sm:flex-col w-full gap-4">
            <Button
              type="button"
              buttonWidthClass="w-16 sm:w-full"
              buttonHeightClass="h-16"
              colorvariant="primary"
              toolTipId="rectangle"
              helpText="Rectangle"
              icon={Square}
              iconPosition="center"
              iconWidth={34}
              iconHeight={34}
              onClick={() => addShape("rectangle")}
            />
            <Button
              type="button"
              buttonWidthClass="w-16 sm:w-full"
              buttonHeightClass="h-16"
              colorvariant="primary"
              toolTipId="circle"
              helpText="Circle"
              icon={Circle}
              iconPosition="center"
              iconWidth={34}
              iconHeight={34}
              onClick={() => addShape("circle")}
            />
            <Button
              type="button"
              buttonWidthClass="w-16 sm:w-full"
              buttonHeightClass="h-16"
              colorvariant="primary"
              toolTipId="triangle"
              helpText="Triangle"
              icon={Triangle}
              iconPosition="center"
              iconWidth={34}
              iconHeight={34}
              onClick={() => addShape("triangle")}
            />
          </div>
        </div>
        <div className="relative flex flex-col w-full h-full gap-y-4 px-5 py-4 rounded-lg bg-tc_black bg-opacity-40">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-4">
            <h2 className="flex w-full font-semibold text-xl text-tc_accent capitalize">
              Shape Studio Design Editor
            </h2>
            <div className="flex justify-between sm:justify-end w-full gap-1 sm:gap-4">
              <Button
                type="button"
                buttonWidthClass="w-10"
                buttonHeightClass="h-10"
                colorvariant="success"
                toolTipId="create-new"
                helpText="Create New"
                icon={Plus}
                iconPosition="center"
                iconWidth={34}
                iconHeight={34}
                onClick={createNewProject}
              />
              <Button
                type="button"
                buttonWidthClass="w-10"
                buttonHeightClass="h-10"
                colorvariant="warning"
                toolTipId="my-projects"
                helpText="My Projects"
                icon={Folder}
                iconPosition="center"
                iconWidth={34}
                iconHeight={34}
                onClick={openSavedProject}
              />
              <Button
                type="button"
                buttonWidthClass="w-10"
                buttonHeightClass="h-10"
                colorvariant="info"
                toolTipId="undo"
                helpText="Undo"
                icon={Undo}
                iconPosition="center"
                iconWidth={34}
                iconHeight={34}
                onClick={undo}
              />
              <Button
                type="button"
                buttonWidthClass="w-10"
                buttonHeightClass="h-10"
                colorvariant="info"
                toolTipId="redo"
                helpText="Redo"
                icon={Redo}
                iconPosition="center"
                iconWidth={34}
                iconHeight={34}
                onClick={redo}
              />
              <Button
                type="button"
                buttonWidthClass="w-10"
                buttonHeightClass="h-10"
                colorvariant="error"
                toolTipId="reset"
                helpText="Reset"
                icon={RotateCcw}
                iconPosition="center"
                iconWidth={34}
                iconHeight={34}
                onClick={resetCanvas}
              />
              <Button
                type="button"
                buttonWidthClass="w-10"
                buttonHeightClass="h-10"
                colorvariant="success"
                toolTipId="save"
                helpText="Save"
                icon={Save}
                iconPosition="center"
                iconWidth={34}
                iconHeight={34}
                onClick={saveDesign}
              />
              <Button
                type="button"
                buttonWidthClass="w-10"
                buttonHeightClass="h-10"
                colorvariant="success"
                toolTipId="download"
                helpText="Download"
                icon={Download}
                iconPosition="center"
                iconWidth={34}
                iconHeight={34}
                onClick={downloadCanvasAsPNG}
              />
            </div>
          </div>

          <div
            id="canvas-area"
            className="border-2 border-dashed border-tc_accent w-full h-full rounded-lg relative bg-transparent"
          >
            {shapes.map((shape) => (
              <Draggable
                key={shape.id}
                position={{ x: shape.x, y: shape.y }}
                onStop={(e, data) => handleDrag(shape.id, data.x, data.y)}
                bounds="#canvas-area"
                cancel=".react-resizable-handle"
              >
                <div style={{ position: "absolute", left: 0, top: 0 }}>
                  <ResizableBox
                    width={shape.width}
                    height={shape.height}
                    axis="both"
                    resizeHandles={["se"]}
                    onResizeStop={(e, data) => handleResize(shape.id, e, data)}
                  >
                    <div
                      className={`${
                        shape.type === "circle"
                          ? "rounded-full"
                          : shape.type === "triangle"
                          ? "clip-triangle"
                          : ""
                      }`}
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor:
                          shape.type === "circle"
                            ? "#00c696"
                            : shape.type === "rectangle"
                            ? "#6366f1"
                            : shape.type === "triangle"
                            ? "#FFFF00"
                            : "#ffffff",
                      }}
                    />
                  </ResizableBox>
                </div>
              </Draggable>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <ModalPopup
          title={
            modalType === "viewProjects"
              ? "Your saved projects"
              : modalType === "newProject"
              ? "Save new project"
              : ""
          }
          closeButton
          cancelButton={modalType === "newProject"}
          onCancel={closeModalPopup}
          actionButton={modalType === "newProject"}
          actionButtonLabel="Save Project"
          actionButtonColorVarient="success"
          onAction={handleSaveProject}
          isOpen={isModalOpen}
        >
          {/* Saved Project */}
          {modalType == "viewProjects" && (
            <div className="flex flex-col w-full gap-y-2">
              {savedProjects.length === 0 ? (
                <p className="w-full px-4 py-8 font-sans text-15 font-normal text-tc_text_accent text-center">
                  No saved designs
                </p>
              ) : (
                savedProjects.map((project) => (
                  <div
                    key={project}
                    onClick={() => {
                      loadDesign(project);
                      setIsModalOpen(false);
                    }}
                    className="flex justify-between items-center w-full gap-x-2 px-4 py-2 rounded-md border border-tc_border/10 bg-tc_black/50 hover:bg-tc_black/60 font-sans text-15 font-normal text-tc_text_accent cursor-pointer transition-all duration-200 ease-linear"
                  >
                    {project}
                    <div className="flex text-tc_error">
                      <button
                        onClick={() => deleteDesign(project)}
                        className="flex justify-center items-center w-5 h-5"
                      >
                        <X width={16} height={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Save New Project */}
          {modalType == "newProject" && (
            <div className="flex flex-col w-full gap-y-1.5">
              <label className="font-medium text-15 text-tc_text_accent capitalize">
                Enter Project Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Project name"
                className="flex items-center w-full h-10 px-3 rounded-md border border-tc_border/20 focus:!border-tc_secondary focus:!outline-none focus:!ring-1 focus:!ring-tc_secondary bg-tc_black/20 font-normal text-15 text-tc_text_accent"
              />
            </div>
          )}
        </ModalPopup>
      )}

      {/* Toasty Alert */}
      <ToastyAlertContainer />
    </>
  );
}
