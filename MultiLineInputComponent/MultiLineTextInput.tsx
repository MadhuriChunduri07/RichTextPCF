import * as React from "react";
import ReactQuill, { Quill } from 'react-quill';
import { IMultiLineTextInputProps } from "./IMultiLineTextInputProps";

const formats = ["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image", "color"];
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

const Font = Quill.import("formats/font");
Font.whitelist = ["arial", "comic-sans", "courier-new", "georgia", "helvetica", "lucida"];
Quill.register(Font, true);

export interface IMultiLineTextInputState
    extends React.ComponentState,
    IMultiLineTextInputProps { }

export default class MultiLineTextInput extends React.Component<IMultiLineTextInputProps, IMultiLineTextInputState>{
    modules = {
        toolbar: {
            container: "#toolbar",
        }
    };

    constructor(props: any) {
        super(props);
        this.state = {
            textValue: props.textValue
        };
    }

    private handleText = (event: any) => {
        this.setState({ textValue: event });
        console.log("Event : ", event);
        console.log("Text value : ", this.state.textValue);
        if (this.props.fieldValueChanged) {
            this.props.fieldValueChanged(event);
        }
    }

    render() {
        return (
            <div>
                <CustomToolbar />
                <ReactQuill value={this.state.textValue} onChange={this.handleText} modules={this.modules}
                    formats={formats} />
            </div>
        )
    }
}

class CustomToolbar extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div id="toolbar">
                <select className="ql-size">
                    <option value="extra-small">Size 1</option>
                    <option value="small">Size 2</option>
                    <option value="medium" selected> Size 3 </option>
                    <option value="large">Size 4</option>
                </select>
                <button className="ql-indent" value="-1" />
                <button className="ql-indent" value="+1" />
                <select className="ql-color" />
                <button className="ql-list" value="ordered" />
                <button className="ql-list" value="bullet" />
                <button className="ql-bold" />
                <button className="ql-underline" />
                <button className="ql-strike" />
                <button className="ql-blockquote" />
                <button className="ql-italic" />
                {/* <button className="ql-script" value="super" />
                <button className="ql-script" value="sub" /> */}
                <button className="ql-clean" />
                {/* <button className="ql-code-block" /> */}
                <button className="ql-image" />
                <button className="ql-link" />
            </div>
        )
    }
};
