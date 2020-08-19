import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { IMultiLineTextInputProps } from "./IMultiLineTextInputProps";
import ReactDOM = require("react-dom");
import React = require("react");
import MultiLineTextInput from "./MultiLineTextInput";

export class MultiLineInputComponent implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private notifyOutputChanged: () => void;
	private _container: HTMLDivElement;
	private props: IMultiLineTextInputProps = {
		fieldValueChanged: this.fieldValueChanged.bind(this)
	}

	private fieldValueChanged(newValue: string) {
		if (this.props.textValue !== newValue) {
			this.props.textValue = newValue;
			this.notifyOutputChanged();
		}
	}

	constructor() {

	}

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		this._container = container;
		this.props.textValue = context.parameters.fieldControl.raw || "";
		this.notifyOutputChanged = notifyOutputChanged;
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void {
		this.props.textValue = context.parameters.fieldControl.raw || "";
		if (this.props.textValue != context.parameters.fieldControl.raw) {
			this.props.textValue = context.parameters.fieldControl.raw || "";
		}

		ReactDOM.render(
			React.createElement(MultiLineTextInput, this.props),
			this._container
		);
	}

	public getOutputs(): IOutputs {
		return {
			fieldControl: this.props.textValue
		};
	}

	public destroy(): void {
		ReactDOM.unmountComponentAtNode(this._container);
	}
}