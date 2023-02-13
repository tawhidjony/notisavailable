import { Box, Button } from "@mui/material"
import React from "react"
import InputField from "../FormItem/InputField"
import SelectBox from "../FormItem/SelectBox"

type selectItemTypes = {
  label: string
  value: string
}

const MediaTypes: selectItemTypes[] = [
  { label: "Video", value: "video" },
  { label: "Image", value: "image" },
]

const GalleryFilter = () => {
  return (
    <form>
      <Box display={"flex"} alignItems="center" gap={2}>
        <InputField type="text" label="Name" />
        <SelectBox label="Media Type" items={MediaTypes} />
        <Button type="submit" variant="contained">
          Search
        </Button>
      </Box>
    </form>
  )
}

export default GalleryFilter
