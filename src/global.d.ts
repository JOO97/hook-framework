declare global {
	interface IStage {
		get: function;
	}
	const stage: IStage;

	interface IComm {}

	type TDynamicObj<T> = {
		[key: string]: T;
	};

	// layer
	interface ICompose {
		delay: number;
		layout: {
			left: string[] | [];
			right: string[] | [];
			top: string[] | [];
			bottom: string[] | [];
		};
	}

	enum LayerType {
		Panel = 'panel',
		Dialog = 'dialog',
	}

	type TLayerType = LayerType.Dialog | LayerType.Panel;

	interface ILayerList {
		type: TLayerType;
		animation: [string, string];
		position: [number, number];
		actions?: TDynamicObj<any>;
		listener?: {
			show?: (data?: any) => void;
			hide?: (data?: any) => void;
		};
	}

	interface ILayers {
		compose: TDynamicObj<ICompose>;
		list: TDynamicObj<ILayerList>;
	}
}

export {};
