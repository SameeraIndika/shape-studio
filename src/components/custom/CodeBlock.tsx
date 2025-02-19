"use client";

import React from "react";
import { a11yDark, CopyBlock } from "react-code-blocks";

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock = (props: CodeBlockProps) => {
  return (
    <CopyBlock
      text={props.code}
      language={props.language}
      showLineNumbers={false}
      codeBlock
      wrapLongLines={true}
      theme={a11yDark}
    />
  );
};

export default CodeBlock;
