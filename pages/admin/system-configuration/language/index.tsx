import React, { Suspense } from "react";
import Skeletons from "../../../../components/Admin/Skeletons";
const LanguageList = React.lazy(() => import('components/Admin/SystemConfiguration/Language/List'));

type Props = {};

const Language = (props: Props) => {
    return (
        <Suspense fallback={<Skeletons />} >
            <LanguageList />
        </Suspense>
    )
};

export default Language;
