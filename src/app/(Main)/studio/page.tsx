"use client";

import React, { useState, useEffect } from "react";

import html2canvas from "html2canvas";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import {
  Circle,
  Download,
  Redo,
  RotateCcw,
  Square,
  Triangle,
  Undo,
} from "lucide-react";
import "react-resizable/css/styles.css";

import { Button } from "@/components/buttons/Button";

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

  useEffect(() => {
    const savedShapes = localStorage.getItem("designShapes");
    if (savedShapes) setShapes(JSON.parse(savedShapes));
  }, []);

  useEffect(() => {
    localStorage.setItem("designShapes", JSON.stringify(shapes));
  }, [shapes]);

  // Add shape
  const addShape = (type: "rectangle" | "circle" | "triangle") => {
    const newShape: Shape = {
      id: Date.now(),
      type,
      x: 100,
      y: 100,
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

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between w-full min-h-[calc(100vh-0px)] gap-4">
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
        <div className="flex sm:flex-col w-full gap-4">
          <Button
            type="button"
            buttonWidthClass="w-16 sm:w-full"
            buttonHeightClass="h-16"
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
            buttonWidthClass="w-16 sm:w-full"
            buttonHeightClass="h-16"
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
            buttonWidthClass="w-16 sm:w-full"
            buttonHeightClass="h-16"
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
            buttonWidthClass="w-16 sm:w-full"
            buttonHeightClass="h-16"
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
      <div className="relative flex flex-col w-full h-full gap-y-4 p-4 rounded-lg bg-tc_black bg-opacity-40">
        <h2 className="font-semibold text-xl text-tc_accent capitalize">
          Shape Studio Design Editor
        </h2>
        <div
          id="canvas-area"
          className="border-2 border-dashed border-tc_accent w-full h-full rounded-lg relative bg-transparent"
        >
          {shapes.map((shape) => (
            <Draggable
              key={shape.id}
              position={{ x: shape.x, y: shape.y }}
              onStop={(e, data) => handleDrag(shape.id, data.x, data.y)}
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
  );
}
