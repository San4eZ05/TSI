type SizeType = "small" | "medium" | "large";
type ColorType = "primary" | "secondary";

interface InputProps {
  type?: string;
  size?: SizeType;
  color?: ColorType;
  placeholder?: string;
  className?: string;
}
export const Input = (props: InputProps) => {
  const {size = "medium", color = "primary", placeholder, className} = props;
  const defaultClass =
    "block w-100px border transition-colors duration-200 focus:outline-none focus:ring-2 font-comfortaa";
  const classes = {
    sizes: {
      small: "px-2 py-1 text-sm rounded",
      medium: "px-3 py-2 text-base rounded-md",
      large: "px-4 py-3 text-lg rounded-lg",
    },
    colors: {
      primary:
        "border-purple-300 focus:border-purple-500 focus:ring-purple-200",
      secondary:
        "border-blue-300 focus:border-blue-500 focus:ring-blue-200",
    },
  };

  return (
    <input
      placeholder={placeholder}
      className={`${defaultClass} ${classes.sizes[size]} ${classes.colors[color]} ${className}`}
    />
  );
};