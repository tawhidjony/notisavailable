import { InputLabel, TextField } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { getGrade } from "Utils/Handler";

// Editable Column when Clicked
export const defaultEditableColumn = {
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
        const handleBlur = () => {
            table.options.meta?.updateData(original.id, id, value || 0);
        }

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value;
            if (+inputValue <= size && +inputValue >= 0) {
                setValue(inputValue || 0);
                // table.options.meta?.updateData(original.id, id, inputValue || 0);
            }
        };

        useEffect(() => {
            setValue(initialValue)
        }, [initialValue])


        return (
            <>
                {((id === 'name_en' || id === "sl" || id === "total" || id === "grade") || courseInfo?.status === 1) ?
                    <InputLabel
                    >
                        {value}
                    </InputLabel>
                    :
                    <TextField
                        type="number"
                        style={{ width: "80px" }}
                        // autoFocus
                        InputProps={{ inputProps: { min: 0, max: size } }}
                        variant="outlined"
                        value={value || ""}
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                }
            </>
        )
    },
}

export const useSkipper = () => {
    const shouldSkipRef = useRef(true)
    const shouldSkip = shouldSkipRef.current
    const skip = useCallback(() => {
        shouldSkipRef.current = false
    }, [])
    useEffect(() => {
        shouldSkipRef.current = true
    })
    return [shouldSkip, skip] as const
}
