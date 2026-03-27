type SizeType = "small" | "middle" | "large";
type ColorType = "primary" | "secondary";

interface ButtonProps {
  size: SizeType;
  color: ColorType;
  title: string;
  onClick: () => void;
  children?: React.JSX.Element;
  disabled?: boolean; 
}

export const Button = (props: ButtonProps) => {
  const { size, color, title, onClick, disabled = false } = props;
  const defaultClass =
    "flex items-center rounded-2 h-[30px] w-[max-content] px-4 py-2 cursor-pointer font-comfortaa transition-colors duration-200";

  const classes = {
    colors: {
      primary: {
        button: "bg-[#8400FF] hover:bg-[#a442ff]",
        text: "text-white",
      },
      secondary: {
        button: "bg-[#8400FF] hover:bg-[#a442ff]",
        text: "text-white",
      },
    },
    sizes: {
      small: "rounded-[100px] font-sm",
      middle: "rounded-[14px] font-base",
      large: "rounded-[16px] font-base min-h-[56px]",
    },
  };

  const buttonColorClasses = disabled
  ? "bg-gray-300 hover:bg-gray-300"
  : classes.colors[color].button;

  const textColorClasses = disabled
  ? "text-gray-500"
  : classes.colors[color].text;

  const cursorClass = disabled ? "cursor-not-allowed" : "";
  const handleClick = () => {
    if (!disabled){
        onClick();
    }
  };
  return (
    <div
      className={`${defaultClass} ${classes.sizes[size]} ${buttonColorClasses} ${textColorClasses} ${cursorClass}`}
      onClick={handleClick}
    >
      <span className={classes.colors[color].text}>{title}</span>
    </div>
  );
};