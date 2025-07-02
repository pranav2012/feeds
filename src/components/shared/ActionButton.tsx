import React from "react";

interface ActionButtonProps {
	icon: React.ReactNode;
	count: number;
	hoverColor: string;
	onClick: () => void;
}

const ActionButton = React.memo<ActionButtonProps>(
	({ icon, count, hoverColor, onClick }) => (
		<button
			className={`flex items-center space-x-2 text-gray-500 ${hoverColor} transition-colors duration-200 p-2 rounded-lg hover:bg-white`}
			onClick={onClick}>
			{icon}
			{count > 0 && <span className="text-sm font-medium">{count}</span>}
		</button>
	)
);

ActionButton.displayName = "ActionButton";

export default ActionButton;
