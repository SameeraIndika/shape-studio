"use client";

import React from "react";
import { a11yDark, CopyBlock } from "react-code-blocks";

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

const CodeBlock = (props: CodeBlockProps) => {
  return (
    <div className="w-full px-2 pt-2 pb-4 rounded-md bg-tc_custom-gray">
      <CopyBlock
        text={props.code}
        language={props.language}
        showLineNumbers={props.showLineNumbers}
        theme={a11yDark}
      />
    </div>
  );
};

export default CodeBlock;
