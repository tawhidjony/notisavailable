


import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import ReactPrint from "components/common/ReactPrint";
import ReactTable from "components/common/ReactTable";
import { globalFilterTableData } from "components/common/ReactTable/utility/GlobalDataFilter";
import { FormLayout, FormLayoutBody } from "components/layouts/FormLayout";
import Link from "next/link";
import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { RootState } from "Store";
import { PrintIcon } from "Utils/CustomIcons";
import { translate } from "Utils/Handler";
import { LangSetUpForList } from "Utils/Language/MasterData/List";

const columnHelper = createColumnHelper<any>();

const ViewTeacherEvaluation = (props: any) => {

  const componentRef = useRef(null);
  const { data, isLoading } = props && props?.data;
  const { lang, langData } = useSelector((state: RootState) => state.lang);

  const columns = useMemo(() => [

    columnHelper.accessor((tableField) => tableField?.teacherInfo?.name_en, {
      id: 'name_en',
      header: "Teacher Name"
    }),
    columnHelper.accessor((tableField) => tableField?.teacherInfo?.learning_center_id?.code, {
      id: 'Center Code',
      header: "Center Code"
    }),
    columnHelper.accessor((tableField) => tableField?.tec_material, {
      id: 'tec_material',
      header: 'Educational materials and educational aids used correctly  Total=10'
    }),
    columnHelper.accessor((tableField) => tableField?.annual_attendance, {
      id: 'annual_attendance',
      header: 'Average Annual  student attendance  Total=20'
    }),
    columnHelper.accessor((tableField) => tableField?.cleanliness, {
      id: 'cleanliness',
      header: 'Cleanliness  Total=10'
    }),
    columnHelper.accessor((tableField) => tableField?.check_lesson, {
      id: 'check_lesson',
      header: 'Whether the progress is  Total=15'
    }),
    columnHelper.accessor((tableField) => tableField?.discipline, {
      id: 'discipline',
      header: 'Discipline/Timely Center Open and Manage  Total=10'
    }),
    columnHelper.accessor((tableField) => tableField?.no_meeting, {
      id: 'no_meeting',
      header: 'Whether the prescribed number of meetings of the Central Monitoring Committee have been held or not  Total=10'
    }),
    columnHelper.accessor((tableField) => tableField?.lesson_plan, {
      id: 'lesson_plan',
      header: 'Lesson plan followed properly'
    }),
    columnHelper.accessor((tableField) => tableField?.other_program, {
      id: 'other_program',
      header: 'Have you implemented anti-dowry programs, tree planting,  Total=10'
    }),
    columnHelper.accessor((tableField) => tableField?.overall_consideration, {
      id: 'overall_consideration',
      header: 'Overall Consideration Total=5'
    }),
    columnHelper.accessor((tableField) => tableField?.total_mark, {
      id: 'total_mark',
      header: 'Total Marks',
    }),
  ], [])

  const columnsPrint = useMemo(() => [

    columnHelper.accessor((tableField) => tableField?.teacherInfo?.name_en, {
      id: 'name_en',
      header: "Teacher Name"
    }),
    columnHelper.accessor((tableField) => tableField?.teacherInfo?.learning_center_id?.code, {
      id: 'Center Code',
      header: "Center Code"
    }),
    columnHelper.accessor((tableField) => tableField?.tec_material, {
      id: 'tec_material',
      header: 'Educational materials and educational aids used correctly  Total=10'
    }),
    columnHelper.accessor((tableField) => tableField?.annual_attendance, {
      id: 'annual_attendance',
      header: 'Average Annual  student attendance  Total=20'
    }),
    columnHelper.accessor((tableField) => tableField?.cleanliness, {
      id: 'cleanliness',
      header: 'Cleanliness  Total=10'
    }),
    columnHelper.accessor((tableField) => tableField?.check_lesson, {
      id: 'check_lesson',
      header: 'Whether the progress is  Total=15'
    }),
    columnHelper.accessor((tableField) => tableField?.discipline, {
      id: 'discipline',
      header: 'Discipline/Timely Center Open and Manage  Total=10'
    }),
    columnHelper.accessor((tableField) => tableField?.no_meeting, {
      id: 'no_meeting',
      header: 'Whether the prescribed number of meetings of the Central Monitoring Committee have been held or not  Total=10'
    }),
    columnHelper.accessor((tableField) => tableField?.lesson_plan, {
      id: 'lesson_plan',
      header: 'Lesson plan followed properly'
    }),
    columnHelper.accessor((tableField) => tableField?.other_program, {
      id: 'other_program',
      header: 'Have you implemented anti-dowry programs, tree planting,  Total=10'
    }),
    columnHelper.accessor((tableField) => tableField?.overall_consideration, {
      id: 'overall_consideration',
      header: 'Overall Consideration Total=5'
    }),
    columnHelper.accessor((tableField) => tableField?.total_mark, {
      id: 'total_mark',
      header: 'Total Marks',
    }),
    columnHelper.accessor((tableField) => tableField?.total_mark, {
      id: '1',
      header: 'Total Marks',
    }),
    columnHelper.accessor((tableField) => tableField?.total_mark, {
      id: '2',
      header: 'Total Marks',
    }),
  ], [])

  const table = useReactTable({
    data: data?.data || [].length === 0,
    columns,
    filterFns: {
      fuzzy: globalFilterTableData,
    },
    getCoreRowModel: getCoreRowModel(),
  })

  const tablePrint = useReactTable({
    data: data?.data || [].length === 0,
    columns: columnsPrint,
    filterFns: {
      fuzzy: globalFilterTableData,
    },
    getCoreRowModel: getCoreRowModel(),
  })

  const handleClickToPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "React Print Islamic Foundation",
    onAfterPrint: () => console.log("Print Success")
  })

  return (
    <FormLayout spinLoading={isLoading}>
      <FormLayoutBody>
        <Box p={5} sx={{ position: "relative" }}>
          <Box sx={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: "flex",
            gap: "10px"
          }}>
            <Button onClick={handleClickToPrint} type="button" variant="outlined" startIcon={<PrintIcon />}>
              {translate(langData, lang, LangSetUpForList.print.key) || "Print"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              LinkComponent={Link}
              href="/admin/teacher-management/teacher-evaluation-summary"
            > Back </Button>

          </Box>
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: 'column', marginBottom: 5 }} >
            <Typography id="modal-modal-title" variant="h4" component="h2"> মসজিদভিত্তিক শিশু ও গণশিক্ষা কার্যক্রম </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2"> ইসলামিক ফাউন্ডেশন </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2"> আগারগাঁও শেরেবাংলানগর, ঢাকা-১২০৭ </Typography>
          </Box>
          <Divider />
          <Box>
            <ReactTable dataSource={table} />
          </Box>
          <Box sx={{ display: 'none' }}>
            <ReactPrint dataSource={tablePrint} dataRef={componentRef} />
          </Box>
        </Box>
      </FormLayoutBody>
    </FormLayout>
  )
}

export default ViewTeacherEvaluation