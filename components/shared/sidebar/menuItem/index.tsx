import { MultiLevel } from "./MultiLevel";
import { SingleLevel } from "./SingleLevel";
import { hasChildren } from "./utils";

type Props = {
    item: any;
    keyProp: any
};
const MenuItem = ({ item, keyProp }: Props) => {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return <Component item={item} key={keyProp} />;
}

export default MenuItem