interface BackgroundContainerOption {
	align?: 'center' | 'left' | 'right';
	valign?: 'center' | 'top' | 'bottom';
	size?: 'contain' | 'cover';
	child?: string;
	outer?: boolean;
}

export default BackgroundContainerOption;
