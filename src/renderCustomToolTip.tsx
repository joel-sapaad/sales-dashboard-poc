import { format } from "date-fns";

const RenderCustomToolTip = (props: any) => {
  return (
    <div style={{background:"#fff"}}>
      <p>{props.label && format(props.label, "dd MMM yyyy")}</p>
    </div>
  );
};

export default RenderCustomToolTip;