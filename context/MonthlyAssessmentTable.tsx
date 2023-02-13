import { InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { getGrade } from "Utils/Handler";

export const defaultMonthlyAssessmentColumn = {
    cell: (props: any) => {
        const { row: { index, original }, column: { id, columnDef: { size } }, table } = props;
        const courseInfo = original?.studentEvalution?.find((course: any) => course?.courseInfo?.key === id);
        let initialValue: number | string;
        const totalNumber = original?.studentEvalution?.reduce((sum: number, course: any) => Number(course.totalmark) + sum, 0);
        const grade = getGrade(totalNumber);
        if (id === "name_en") {
            initialValue = original[id]
        } else if (id === "sl") {
            initialValue = index + 1;
        } else if (id === "total") {
            initialValue = totalNumber;
        } else if (id === "grade") {
            initialValue = grade;
        } else {
            initialValue = courseInfo?.totalmark;
        }
        const [value, setValue] = useState(initialValue)

        useEffect(() => {
            setValue(initialValue)
        }, [initialValue])


        return (
            <InputLabel
            >
                {value}
            </InputLabel>
        )
    },
}