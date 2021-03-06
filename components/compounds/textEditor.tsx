// TextEditor.tsx
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
// import ReactQuill from "react-quill";

const modules = {
	toolbar: [
		[{ header: [1, 2, false] }],
		["bold", "italic", "underline"],
		[
			{ list: "ordered" },
			{ list: "bullet" },
			// { indent: "-1" },
			// { indent: "+1" },
		],
		["link", "code"],
		// ["clean"],
	],
};

const formats = [
	"header",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"indent",
	"link",
	"code",
];

interface OnChangeHandler {
	(e: any): void;
}

type Props = {
	value?: string;
	placeholder?: string;
	onChange?: OnChangeHandler;
};

const ReactQuill = dynamic(() => import("react-quill"), {
	ssr: false,
});

const TextEditor: React.FC<Props> = ({ value, onChange, placeholder }) => {
	return (
		<>
			<ReactQuill
				theme="snow"
				value={value || ""}
				modules={modules}
				formats={formats}
				onChange={onChange}
				placeholder={placeholder}
				style={{ minHeight: "80px" }}
			/>
		</>
	);
};

export default TextEditor;
