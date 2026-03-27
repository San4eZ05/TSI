type SizeType = "small" | "medium" | "large" | "title";
type ColorType = "primary" | "secondary" | "none";

interface TextProps {
  size?: SizeType;
  color: ColorType;
  text: string;
  className?: string;
}

export const Text = (props: TextProps) => {
  const {size="medium", color, text, className} = props;
  const defaultClass = "font-comfortaa"
  const classes = {
    sizes: {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
      title: "text-[1.75rem]",
    },
    colors: {
      primary: "text-black",
      secondary: "text-white",
      none:"",
    },
  };

  return (
    <a 
        className={`${defaultClass} ${classes.sizes[size]} ${classes.colors[color]} ${className}`}>
    {text}
    </a>

  );

}    // <div
    //   className={`${defaultClass} ${classes.sizes[size]}`}
    // >
    //   <span className={classes.colors[color].text}>{title}</span>
    // </div>