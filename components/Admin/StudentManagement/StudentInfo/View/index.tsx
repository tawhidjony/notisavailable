import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { FormLayout, FormLayoutBody } from "components/layouts/FormLayout";
import Link from "next/link";
import { ViewStyle } from "./viewStyle";



const ViewStudentInfo = (props: any) => {
  const { data, isLoading } = props && props?.data;
  // console.log('data', data?.data);
  return (
    <>
      <FormLayout spinLoading={isLoading}>
        <FormLayoutBody>
          <Box p={5} sx={{ ...ViewStyle }}>
            <Button sx={{
              position: 'absolute',
              top: '20px',
              right: '20px',
            }}
              type="button"
              LinkComponent={Link}
              href="/admin/student-management/student-info"
            > Back </Button>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: 'column', marginBottom: 5 }} >
              <Typography id="modal-modal-title" variant="h4" component="h2"> মসজিদভিত্তিক শিশু ও গণশিক্ষা কার্যক্রম </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2"> ইসলামিক ফাউন্ডেশন </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2"> আগারগাঁও শেরেবাংলানগর, ঢাকা-১২০৭ </Typography>
            </Box>
            <Divider />

            <Box className="textViewField">
              <Box className="studentTitle">
                <Typography>Student Info ({data?.data?.data?.name_en})</Typography>
              </Box>
              <Box className="contentBody">
                <Box className="centerTextField">
                  <Typography className="centerText">কেন্দ্রের স্তরঃ</Typography>
                  <Typography className="centerTextRight">{data?.data?.data?.learning_center_id?.centertypeId?.name_en}</Typography>
                </Box>
                <Box className="centerTextField">
                  <Typography className="centerText">কেন্দ্রের কোড নম্বরঃ</Typography>
                  <Typography className="centerTextRight">{data?.data?.data?.learning_center_id?.code}</Typography>
                </Box>
                <Box className="centerTextField">
                  <Typography className="centerText">কেন্দ্রের নামঃ</Typography>
                  <Typography className="centerTextRight">{data?.data?.data?.learning_center_id?.name_en}</Typography>
                </Box>
                <Box className="centerTextField">
                  <Typography className="centerText">রোল নাম্বারঃ</Typography>
                  <Typography className="centerTextRight">{data?.data?.data?.roll_number}</Typography>
                </Box>
                <Box className="centerTextField">
                  <Typography className="centerText">জন্ম তারিখঃ</Typography>
                  <Typography className="centerTextRight">{data?.data?.data?.dob}</Typography>
                </Box>
                <Box className="centerTextField">
                  <Typography className="centerText">বয়সঃ</Typography>
                  <Typography className="centerTextRight">{data?.data?.data?.age}</Typography>
                </Box>
                <Box className="centerTextField">
                  <Typography className="centerText">জন্ম নিবন্ধন নম্বর</Typography>
                  <Typography className="centerTextRight">{data?.data?.data?.bcn}</Typography>
                </Box>
                <Box className="centerTextField">
                  <Typography className="centerText">এনআইডঃ</Typography>
                  <Typography className="centerTextRight">{data?.data?.data?.nid}</Typography>
                </Box>
                <Box className="centerTextField">
                  <Typography className="centerText">শিক্ষাবর্ষঃ</Typography>
                  <Typography className="centerTextRight">{data?.data?.data?.session?.name_en}</Typography>
                </Box>
              </Box>
              <Divider />

              <Box className="addressField">
                <Grid
                  container
                  spacing={2}

                >
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box className="addressContent">
                      <Typography className="centerText">বিভাগঃ</Typography>
                      <Typography className="centerTextRight">{data?.data?.data?.divisionId?.name_en}</Typography>
                    </Box>
                    <Box className="addressContent">
                      <Typography className="centerText">উপজেলাঃ</Typography>
                      <Typography className="centerTextRight">{data?.data?.data?.upazilaId?.name_en}</Typography>
                    </Box>
                    <Box className="addressContent">
                      <Typography className="centerText">সিটি কর্পোরেশনঃ</Typography>
                      <Typography className="centerTextRight">{data?.data?.data?.ward}</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                    <Box className="addressContent">
                      <Typography className="centerText">জেলাঃ</Typography>
                      <Typography className="centerTextRight">{data?.data?.data?.districtId?.name_en}</Typography>
                    </Box>
                    <Box className="addressContent">
                      <Typography className="centerText">ইউনিয়ন/ওয়ার্ড নংঃ</Typography>
                      <Typography className="centerTextRight">{data?.data?.data?.session?.name_en}</Typography>
                    </Box>
                    <Box className="addressContent">
                      <Typography className="centerText">এলাকা/গ্রামঃ</Typography>
                      <Typography className="centerTextRight">{data?.data?.data?.village}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Divider />

              <Box className="contentBody">
                <Box className="centerTextField">
                  <Typography className="centerText">প্রতিষ্ঠানের নামঃ</Typography>
                  <Typography className="centerTextRight">{data?.data?.data?.institute_name}</Typography>
                </Box>
                <Box className="centerTextField">
                  <Typography className="centerText">ছাত্রের পেশাঃ</Typography>
                  <Typography className="centerTextRight">{data?.data?.data?.profession}</Typography>
                </Box>
              </Box>
              <Divider />

              <Box className="addressField">
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box className="addressContent">
                      <Typography className="centerText">পিতার নামঃ</Typography>
                      <Typography className="centerTextRight">{data?.data?.data?.father_name_en}</Typography>
                    </Box>
                    <Box className="addressContent">
                      <Typography className="centerText">মোবাইল নম্বরঃ</Typography>
                      <Typography className="centerTextRight">{data?.data?.data?.father_mobile}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box className="addressContent">
                      <Typography className="centerText">পেশাঃ</Typography>
                      <Typography className="centerTextRight">{data?.data?.data?.father_occupation}</Typography>
                    </Box>
                    <Box className="addressContent">
                      <Typography className="centerText">father_nid</Typography>
                      <Typography className="centerTextRight">{data?.data?.data?.father_nid}</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box className="addressContent">
                      <Typography className="centerText">মাতার নামঃ</Typography>
                      <Typography className="centerTextRight">{data?.data?.data?.mother_name_en}</Typography>
                    </Box>
                    <Box className="addressContent">
                      <Typography className="centerText">মোবাইল নম্বরঃ</Typography>
                      <Typography className="centerTextRight">{data?.data?.data?.mother_mobile}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box className="addressContent">
                      <Typography className="centerText">পেশাঃ</Typography>
                      <Typography className="centerTextRight">{data?.data?.data?.mother_occupation}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>

          </Box>
        </FormLayoutBody>
      </FormLayout>
    </>
  )
}

export default ViewStudentInfo