import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import AuthMiddleware from "Utils/Middleware/AuthMiddleWare";
import { AdminStyle } from "./AdminStyle";


type Props = {}

const DashboardMainPage = (props: Props) => {

  const data = [
    { name: "প্রাক-প্রাথমিক", uv: 80, pv: 2400, amt: 2400 },
    { name: "সহজ কোরআন শিক্ষা", uv: 100, pv: 200, amt: 200 },
    { name: "সহজ কোরআন শিক্ষা (বয়স্ক)", uv: 50, pv: 150, amt: 150 },
  ];

  function createData(
    sl: number,
    date: string,
    centerCode: string,
    centerName: string,
    department: string,
    district: string,
    visitor: string
  ) {
    return { sl, date, centerCode, centerName, district, department, visitor };
  }
  const rows = [
    createData(
      1,
      "০১/০৮/২০২২",
      "১০১৩৫৪৫৫",
      "এ বি সি সেন্টার",
      "ঢাকা",
      "কুমিল্লা",
      "সোলাইমান"
    ),
    createData(
      2,
      "০১/০৮/২০২২",
      "১০১৩৫৪৫৫",
      "এ বি সি সেন্টার",
      "ঢাকা",
      "কুমিল্লা",
      "সোলাইমান"
    ),
    createData(
      3,
      "০১/০৮/২০২২",
      "১০১৩৫৪৫৫",
      "এ বি সি সেন্টার",
      "ঢাকা",
      "কুমিল্লা",
      "সোলাইমান"
    ),
  ];

  return (
    <Box sx={{ ...AdminStyle }}>
      <Box className="dashboardBg">
        <Grid
          container
          spacing={4}
          direction="row"
          justifyContent="space-around"
          alignItems="stretch"
        >
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Box className="infoContent">
              <Box className="fieldTitle">
                <Typography variant="h4" component="h4">
                  এক পলক
                </Typography>
              </Box>
              <Box className="boxField">
                <Box className="teachingInfoField">
                  <Typography>শিক্ষা কেন্দ্রের তথ্য</Typography>
                  <Box className="teachingInfo">
                    <Typography className="lavelTitle">
                      মোট কেন্দ্র
                      <Typography component="span" className="count">
                        ৬৮,২০৫
                      </Typography>
                    </Typography>
                    <Box className="lavelContent">
                      <Typography>
                        সক্রিয় কেন্দ্র:
                        <Typography component="span" className="count">
                          ৬৮, ২০৫
                        </Typography>
                      </Typography>
                      <Typography>
                        খালি কেন্দ্র:
                        <Typography component="span" className="count">
                          ২০৫
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box className="teachingInfoField">
                  <Typography>রিসোর্স সেন্টার তথ্য</Typography>
                  <Box className="teachingInfo">
                    <Typography className="lavelTitle">
                      মোট কেন্দ্র
                      <Typography component="span" className="count">
                        ৬৮,২০৫
                      </Typography>
                    </Typography>
                    <Box className="lavelContent">
                      <Typography>
                        সক্রিয় কেন্দ্র:
                        <Typography component="span" className="count">
                          ৬৮, ২০৫
                        </Typography>
                      </Typography>
                      <Typography>
                        খালি কেন্দ্র:
                        <Typography component="span" className="count">
                          ২০৫
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box className="boxField">
                <Box className="teachingInfoField">
                  <Typography>শিক্ষার্থীর তথ্য</Typography>
                  <Box className="totalInfo">
                    <Typography>
                      মোট ভর্তি : <strong>৬৮,০০০</strong>
                    </Typography>
                    <Typography>
                      প্রাক-প্রাথমিক : <strong>৬০,০০০</strong>
                    </Typography>
                    <Typography>
                      সহজ কোরআন শিক্ষা : <strong>৮,০০০</strong>
                    </Typography>
                    <Typography>
                      সহজ কোরআন শিক্ষা (বয়ষ্ক): <strong>৬০০</strong>
                    </Typography>
                  </Box>
                </Box>
                <Box className="teachingInfoField">
                  <Typography>চলতি বছরে ভর্তির তথ্য</Typography>
                  <Box className="totalInfo">
                    <Typography>
                      মোট ভর্তি : <strong>৬৮,০০০</strong>
                    </Typography>
                    <Typography>
                      প্রাক-প্রাথমিক : <strong>৬০,০০০</strong>
                    </Typography>
                    <Typography>
                      সহজ কোরআন শিক্ষা : <strong>৮,০০০</strong>
                    </Typography>
                    <Typography>
                      সহজ কোরআন শিক্ষা (বয়ষ্ক): <strong>৬০০</strong>
                    </Typography>
                  </Box>
                </Box>
                <Box className="teachingInfoField">
                  <Typography>শিক্ষকদের তথ্য</Typography>
                  <Box className="totalInfo">
                    <Typography>
                      মোট ভর্তি : <strong>৬৮,০০০</strong>
                    </Typography>
                    <Typography>
                      প্রাক-প্রাথমিক : <strong>৬০,০০০</strong>
                    </Typography>
                    <Typography>
                      সহজ কোরআন শিক্ষা : <strong>৮,০০০</strong>
                    </Typography>
                    <Typography>
                      সহজ কোরআন শিক্ষা (বয়ষ্ক): <strong>৬০০</strong>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Box className="infoBar">
              <Box className="fieldTitle">
                <Typography variant="h4" component="h4">
                  শিক্ষা কেন্দ্রের ধরন
                </Typography>
              </Box>
              {/* <Box id="skills">
            <Box id="part1" className="circle animate">
              <h3>সহজ কোরআন শিক্ষা কেন্দ্র </h3>
            </Box>
            <Box id="part2" className="circle animate">
              <h3>সহজ কোরআন শিক্ষা কেন্দ্র (বয়ষ্ক)</h3>
            </Box>
            <Box id="part3" className="circle animate">
              <h3>প্রাক-প্রাথমিক শিক্ষা কেন্দ্র</h3>
            </Box>
            <h2>৫৩%</h2>
          </Box> */}
            </Box>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={4}
          direction="row"
          justifyContent="space-around"
          alignItems="stretch"
        >
          <Grid item xs={12} sm={12} md={5} lg={5} xl={4}>
            <Box className="studentInfo">
              <Box className="fieldTitle">
                <Typography variant="h4" component="h4">
                  বার্ষিক শিক্ষার্থী ভর্তি তথ্য
                </Typography>
                {/* <Box className="barChart">
            <Chart
              type="bar"
              width={470}
              height={430}
              series={[
                {
                  // name: "company name",
                  data: [45, 78, 98, 32, 65, 54],
                  // color: "#006F40",
                },
                // {
                //   name: "HydroElectric",
                //   data: [145, 78, 98, 32, 65, 54],
                //   // color: "#006F40",
                // },
                // { name: "dfdfd", data: [54, 47, 49, 12, 35] },
              ]}
              options={{
                colors: [
                  "#cc0000",
                  "#ff4000",
                  "#ffbf00",
                  "#40ff00",
                  "#00ffff",
                  "#0000ff",
                ],

                plotOptions: {
                  bar: {
                    horizontal: false,
                    columnWidth: "50%",
                    distributed: true,

                    dataLabels: {
                      // orientation: 'horizontal',
                      position: "end",
                    },
                  },
                },

                dataLabels: {
                  enabled: false,
                  style: {
                    fontSize: "12px",
                    colors: ["#000"],
                  },
                },

                xaxis: {
                  categories: [
                    ["2021-202", "প্রাক-প্রাথমিক"],
                    ["2021-2022", "সহজ কোরআন শিক্ষা"],
                    ["2021-2022", "সহজ কোরআন শিক্ষা (বয়স্ক)"],
                  ],

                  title: {
                    // text: "energy consumption in year's",
                  },
                },
                yaxis: {
                  // title: {
                  //   text: "data in (K)",
                  // },
                },
              }}
            />
          </Box> */}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={7} lg={7} xl={8}>
            <Box className="visite">
              <Box className="visiteHead">
                <Box className="fieldTitle">
                  <Typography variant="h4" component="h4">
                    আজকের ভিজিট
                  </Typography>
                </Box>
                <Box className="todayVisitHead">
                  <Button type="button">সব দেখুন</Button>
                </Box>
              </Box>
              <Box className="todayVisitTable">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell className="slNo">ক্র/নং</TableCell>
                        <TableCell align="center">তারিখ</TableCell>
                        <TableCell align="center">কেন্দ্র কোড</TableCell>
                        <TableCell align="center">কেন্দ্র নাম</TableCell>
                        <TableCell align="center">বিভাগ</TableCell>
                        <TableCell align="center">জেলা</TableCell>
                        <TableCell align="center">দর্শনার্থী</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.sl}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 1 },
                          }}
                        >
                          <TableCell>{row.sl}</TableCell>
                          <TableCell align="center">{row.date}</TableCell>
                          <TableCell align="center">{row.centerCode}</TableCell>
                          <TableCell align="center">{row.centerName}</TableCell>
                          <TableCell align="center">{row.district}</TableCell>
                          <TableCell align="center">{row.department}</TableCell>
                          <TableCell align="center">{row.visitor}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={4}
          direction="row"
          justifyContent="space-around"
          alignItems="stretch"
        >
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Box className="roundChart">
              <Box className="fieldTitle">
                <Typography variant="h4" component="h4">
                  Rounded Chart
                </Typography>
              </Box>
              Rounded Chart Design
              {/* <Box className="donutChart2">
            <Chart
              type="donut"
              width={400}
              height={400}
              series={[20, 67]}
              options={{
                labels: ["usa", "china"],
                title: {
                  text: "Medal Country Name",
                },
                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        show: true,
                        total: {
                          show: true,
                          fontSize: "20",
                          color: "red",
                        },
                      },
                    },
                  },
                },
                dataLabels: {
                  enabled: false,
                },
              }}
            ></Chart>
          </Box> */}
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Box className="lineChart">
              <Box className="fieldTitle">
                <Typography variant="h4" component="h4">
                  Line Chart
                </Typography>
              </Box>
              Line Chart Design
              {/* <Box className="lineChart">
            <Chart
              type="bar"
              width={550}
              height={300}
              series={[
                {
                  name: "company 1",
                  data: [105, 178, 98],
                },
                {
                  name: "company 2",
                  data: [245, 278, 298],
                },
                {
                  name: "company 3",
                  data: [145, 158, 198],
                },
              ]}
              options={{
                colors: ["#0263ff", "#62116b", "#637f46"],
                plotOptions: {
                  bar: {
                    distributed: false,
                    horizontal: true,
                    columnWidth: "55%",
                    dataLabels: {
                      position: "end",
                    },
                  },
                  
                },
                dataLabels: {
                  enabled: true,
                  style: {
                    fontSize: "12px",
                    colors: ["#000"],
                  },
                },
                xaxis: {
                  categories: [1, 2, 3],
                },
                grid: {
                  show: true,
                },
              }}
            ></Chart>

          </Box> */}
            </Box>
          </Grid>
        </Grid>

        <Box className="admincontentField"></Box>
      </Box>
    </Box>
  )
}

export default DashboardMainPage
export const getServerSideProps = async (context: any) => AuthMiddleware(context);
