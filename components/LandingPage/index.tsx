import { Box, Grid, Link, List, ListItem, SxProps, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { HomeStyle } from './styles/HomeStyle';

const HomeLandingPage = () => {
  const theme = useTheme();
  return (
    <Box sx={{ ...HomeStyle } as SxProps} >
      <Box className="containerMainField">
        <Box className="carousel">
          <img src="assets/images/cover-image-1.jpg" alt="" />
        </Box>



        <div className="dropdown">
          <ul>
            <li className="col0">
              <button className="dropbtn">আমাদের সম্পর্কিত</button>
              <div className="dropdown-content">
                <div className="under-content">
                  <h6>পরিচিতি</h6>
                  <ul>
                    <li><a href="#">ইসলামিক ফাউন্ডেশন পরিচিতি</a></li>
                    <li><a href="#">বোর্ড অব গভর্নরস</a></li>
                    <li><a href="#">মহাপরিচালকবৃন্দ</a></li>
                    <li><a href="#">বার্ষিক প্রতিবেদন</a></li>
                    <li><a href="#">সিটিজেন চার্টার </a></li>
                    <li><a href="#">তথ্যের ক্যাটাগরি ও ক্যাটালগ </a></li>
                  </ul>
                </div>
                <div className="under-content">
                  <h6>প্রধান কার্যালয়,বিভাগ ও জেলা কার্যালয়ের কর্মকর্তাবৃন্দ</h6>
                  <ul>
                    <li><a href="#">কর্মকর্তাবৃন্দ</a></li>
                  </ul>
                </div>
              </div>
            </li>
            <li className="col1">
              <button className="dropbtn2">বিভাগ ও প্রকল্প</button>
              <div className="dropdown-content1">
                <div className="under-content">
                  <h6>বিভাগ</h6>
                  <ul>
                    <li><a href="#">প্রশাসন</a></li>
                    <li><a href="#">অর্থ ও হিসাব বিভাগ</a></li>
                  </ul>
                </div>
                <div className="under-content">
                  <h6>প্রকল্প</h6>
                  <ul>
                    <li><a href="#">মসজিদভিত্তিক শিশু ও গণশিক্ষা কার্যক্রম</a></li>
                    <li><a href="#">ইসলামী প্রকাশনা প্রকল্প</a></li>
                  </ul>
                </div>
              </div>
            </li>

            <li className="col2">
              <button className="dropbtn3">প্রকাশনা/জার্নাল/পত্রিকা</button>
              <div className="dropdown-content2">
                <div className="under-content">
                  <h6> </h6>
                  <ul>
                    <li><a href="#">জঙ্গিবাদের উৎস- সামীম মোহাম্মদ আফজাল</a></li>
                    <li><a href="#">কুরআন ও তাফসীর</a></li>
                  </ul>
                </div>

              </div>
            </li>

          </ul>
        </div>

        <Box className="homeContentField">
          <Grid
            container
            spacing={2}
          >
            <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>
              {/* notice board start */}
              <Box className="noticeBoard">
                <h2>নোটিশ বোর্ড</h2>
                <Box id="notice-board-ticker">
                  <List>
                    <ListItem>
                      <Link href="#">অফিস আদেশঃ ২৩৩৩ (বদলী) তারিখঃ ১০-০১-২০২৩</Link>				</ListItem>
                    <ListItem>
                      <Link href="#">প্রেস বিজ্ঞপ্তি: টঙ্গি বিশ্ব ইজতেমা সফলভাবে বাস্তবায়নের লক্ষ্যে দেশের সকল মসজিদের খুত...</Link>				</ListItem>
                    <ListItem>
                      <Link href="#">অফিস আদেশঃ ২৩৩৪ (বদলী) তারিখঃ ১০-০১-২০২৩</Link>				</ListItem>
                    <ListItem>
                      <Link href="#">অফিস আদেশঃ ১৩ (বদলী) তারিখঃ ০৯-০১-২০২৩</Link>				</ListItem>
                    <ListItem>
                      <Link href="#">পাসপোর্টের বিভাগীয় অনাপত্তিঃ- মোঃ শোয়াইবুর রহমান, ফিল্ড সুপারভাইজার, মসজিদভিত্তিক...</Link>				</ListItem>
                  </List>
                  <Link className="allNoticeBtn" href="#" >সকল</Link>
                </Box>

              </Box>
              {/* notice board end */}

              {/* news headline start */}
              <Box className="newsHeadLine">
                <h5>খবর:</h5>
                <Link href="#">পাসপোর্টের বিভাগীয় অনাপত্তিঃ- মোঃ শোয়াইবুর রহমান, ফিল্ড সুপারভাইজার, মসজিদভিত্তিক শিশ...</Link>
                <Link className="allNewsBtn" href="#" >সকল</Link>
              </Box>
              {/* news headline end */}

              {/* all notice start */}
              <Box className="noticeContent">
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box className="homeSingleContent">
                      <h3>বঙ্গবন্ধু কর্নার</h3>
                      <Box className="imageText">
                        <img src="/assets/images/bonghobondhu.png" alt="bonghobondhu-img" />
                        <List>
                          <ListItem>
                            <Link href="#">মুজিবস্মরণে আয়োজিত অনুষ্ঠানমালা</Link>
                          </ListItem>
                          <ListItem>
                            <Link href="#">ইসলাম ও বঙ্গবন্ধু" শীর্ষক প্রামাণ্যচিত্র </Link>
                          </ListItem>
                          <ListItem>
                            <Link href="#">স্মারকগ্রন্থঃ "চেতনায় বঙ্গবন্ধু</Link>
                          </ListItem>
                          <ListItem>
                            <Link href="#">মুজিববর্ষে প্রকাশিত শতগ্রন্থ</Link>
                          </ListItem>
                        </List>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box className="homeSingleContent">
                      <h3>বঙ্গবন্ধু কর্নার</h3>
                      <Box className="imageText">
                        <img src="/assets/images/bonghobondhu.png" alt="bonghobondhu-img" />
                        <List>
                          <ListItem>
                            <Link href="#">মুজিবস্মরণে আয়োজিত অনুষ্ঠানমালা</Link>
                          </ListItem>
                          <ListItem>
                            <Link href="#">ইসলাম ও বঙ্গবন্ধু" শীর্ষক প্রামাণ্যচিত্র </Link>
                          </ListItem>
                          <ListItem>
                            <Link href="#">স্মারকগ্রন্থঃ "চেতনায় বঙ্গবন্ধু</Link>
                          </ListItem>
                          <ListItem>
                            <Link href="#">মুজিববর্ষে প্রকাশিত শতগ্রন্থ</Link>
                          </ListItem>
                        </List>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              {/* all notice end */}
            </Grid>

            {/* all employee field start */}
            <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
              <Box className="employeeField">
                <Box className="protimontri">
                  <h4>মাননীয় প্রতিমন্ত্রী ও চেয়ারম্যান</h4>
                  <Box className="protimontriContent">
                    <img src="/assets/images/protimontri.jpg" alt="protimontri" />
                    <h3>মোঃ ফরিদুল হক খান এম.পি.</h3>
                    <Typography>
                      <span>মাননীয় প্রতিমন্ত্রী, ধর্ম বিষয়ক মন্ত্রণালয়</span>
                      <span>গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</span><br />
                      <span>ও</span><br />
                      <span>চেয়ারম্যান, বোর্ড অব গভর্নর, ইসলামিক ফাউন্ডেশন </span>
                    </Typography>
                  </Box>
                </Box>

                <Box className="mohaporichalok">
                  <h4>মহাপরিচালক</h4>
                  <Box className="mohaporichalokContent">
                    <img src="/assets/images/protimontri.jpg" alt="protimontri" />
                    <Box className="nameDesignation">
                      <h3>মোঃ মুনিম হাসান</h3>
                      <h5>মহাপরিচালক ( অতিরিক্ত সচিব)</h5>
                      <h5>ইসলামিক ফাউন্ডেশন</h5>
                    </Box>
                  </Box>
                  <Link href="#">বিস্তারিত</Link>
                </Box>

                <Box className="innovation">
                  <h4>ইনোভেশন কর্নার</h4>
                  <Box className="innovationContent">
                    <img src="/assets/icons/tickIcon.png" alt="tickIcon" />
                    <Link href="#">ইনোভেশন টিম</Link>
                  </Box>
                  <Box className="innovationContent">
                    <img src="/assets/icons/tickIcon.png" alt="tickIcon" />
                    <Link href="#">ইনোভেশন কর্মপরিকল্পনা</Link>
                  </Box>
                </Box>

                <Box className="video">
                  <h4>ভিডিও চিত্র</h4>
                  <Box className="videoContent">
                    <iframe width="200" height="200" src="https://www.youtube.com/embed/dFLYkkMc9fY" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" >
                    </iframe>
                  </Box>
                </Box>

                <Box className="eService">
                  <Box className="eServiceLogo">
                    <Link href="#">
                      <h4>অভ্যন্তরীণ ই-সেবাসমূহ</h4>
                      <img src="/assets/bd-logo.png" alt="" />
                    </Link>
                  </Box>
                  <Box className="eServiceContent">
                    <img src="/assets/icons/tickIcon.png" alt="tickIcon" />
                    <Link href="#">ইসলামিক ফাউন্ডেশন ওয়েবমেইল</Link>
                  </Box>
                  <Box className="eServiceContent">
                    <img src="/assets/icons/tickIcon.png" alt="tickIcon" />
                    <Link href="#">ইসলামি তথ্যসেবা নির্দেশিকা-২০২২</Link>
                  </Box>
                  <Box className="eServiceContent">
                    <img src="/assets/icons/tickIcon.png" alt="tickIcon" />
                    <Link href="#">ইসলামিক ফাউন্ডেশনের ইমেইলসমূহ</Link>
                  </Box>
                  <Box className="eServiceContent">
                    <img src="/assets/icons/tickIcon.png" alt="tickIcon" />
                    <Link href="#">ইসলামিক ফাউন্ডেশনের সেবা প্রোফাইল</Link>
                  </Box>
                  <Link className="allEserviceBtn" href="#" >সকল</Link>
                </Box>

                <Box className="consideration">
                  <h4>মতামত</h4>
                  <Link href="#">পরামর্শ</Link>
                </Box>

                <Box className="hotLine">
                  <h4>হটলাইন</h4>
                  <Box className="hotLineContent">
                    <Typography className="hotLineNumber">১০৬</Typography>
                    <Typography>দুদক হটলাইন</Typography>
                    <Typography className="hotLineNumber">৯৯৯</Typography>
                    <Typography>জরুরী সেবা হটলাইন</Typography>
                    <Typography className="hotLineNumber">৩৩৩</Typography>
                    <Typography>নাগরিক সেবা হটলাইন</Typography>
                    <Typography className="hotLineNumber">১০৯৮</Typography>
                    <Typography>শিশুর সহায়তায় হটলাইন</Typography>
                    <Typography className="hotLineNumber">১০৯</Typography>
                    <Typography>নারী ও শিশু নির্যাতন হটলাইন</Typography>
                  </Box>
                </Box>

                <Box className="centerEService">
                  <Link href="#">
                    <h4>কেন্দ্রীয় ই-সেবা</h4>
                  </Link>
                </Box>

                <Box className="importentLink">
                  <Box className="importentLinkHead">
                    <h4>গুরুত্বপূর্ণ লিংক</h4>
                  </Box>
                  <Box className="importentLinkContent">
                    <img src="/assets/icons/tickIcon.png" alt="tickIcon" />
                    <Link target="_blank" href="https://www.eprocure.gov.bd/">ই-জিপি</Link>
                  </Box>
                  <Box className="importentLinkContent">
                    <img src="/assets/icons/tickIcon.png" alt="tickIcon" />
                    <Link target="_blank" href="https://cptu.gov.bd/">সিপিটিইউ</Link>
                  </Box>
                  <Box className="importentLinkContent">
                    <img src="/assets/icons/tickIcon.png" alt="tickIcon" />
                    <Link target="_blank" href="https://hajj.gov.bd/">বাংলাদেশ হজ্জ ম্যানেজমেন্ট পোর্টাল</Link>
                  </Box>
                  <Box className="importentLinkContent">
                    <img src="/assets/icons/tickIcon.png" alt="tickIcon" />
                    <Link target="_blank" href="http://www.quran.gov.bd/">আল কুরআনঃ ডিজিটাল</Link>
                  </Box>
                  <Box className="importentLinkContent">
                    <img src="/assets/icons/tickIcon.png" alt="tickIcon" />
                    <Link target="_blank" href="http://adp.plancomm.gov.bd/">এডিপি/ আরএডিপি ম্যানেজমেন্ট</Link>
                  </Box>
                  <Box className="importentLinkContent">
                    <img src="/assets/icons/tickIcon.png" alt="tickIcon" />
                    <Link target="_blank" href="http://www.mora.gov.bd/">ধর্ম বিষয়ক মন্ত্রণালয়</Link>
                  </Box>
                  <Box className="importentLinkContent">
                    <img src="/assets/icons/tickIcon.png" alt="tickIcon" />
                    <Link target="_blank" href="http://www.bangladesh.gov.bd">জাতীয় তথ্য বাতায়ন</Link>
                  </Box>
                  <Link className="allEserviceBtn" href="#" >সকল</Link>
                </Box>

                <Box className="googleMap">
                  <Box className="googleMapHead">
                    <h4>ম্যাপ</h4>
                  </Box>
                  <Box className="googleMapContent">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d196.9992972238801!2d90.37495936992279!3d23.77687107422827!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c74d2d50acbd%3A0x7cf95e498c74463d!2sIslamic%20Foundation!5e1!3m2!1sen!2sbd!4v1673504118089!5m2!1sen!2sbd" width="100%" height="300" loading="lazy" ></iframe>
                  </Box>
                </Box>

                <Box className="themeSong">
                  <Box className="themeSongHead">
                    <h4>জাতীয় সংগীত</h4>
                  </Box>
                  <Box className="themeSongAudio">
                    <audio controls>
                      <source src="http://www.islamicfoundation.gov.bd/sites/default/files/files/cabinet.portal.gov.bd/page/e5f25d4e_f0a7_4b2a_a07c_3ec69a793516/bd_national_anthem.mp3" type="audio/mpeg" />
                    </audio>
                  </Box>
                </Box>

                <Box className="offer">
                  <a target="_blank" href="#">
                    <img src="/assets/images/offer.jpg" alt="" />
                  </a>
                </Box>
                <Box className="emergincyHotLine">
                  <h4>জরুরি হটলাইন</h4>
                  <img src="/assets/images/hotline.jpg" alt="" />
                </Box>

                <Box className="easyService">
                  <a target="_blank" href="#">
                    <h4>সেবা সহজিকরণ</h4>
                  </a>
                </Box>

                <Box className="importentLink">
                  <Box className="importentLinkHead">
                    <h4>ইনোভেশন কর্নার</h4>
                  </Box>
                  <Box className="importentLinkContent">
                    <img src="/assets/icons/tickIcon.png" alt="tickIcon" />
                    <Link target="_blank" href="http://www.islamicfoundation.gov.bd/">ইনোভেশন টিম</Link>
                  </Box>
                  <Box className="importentLinkContent">
                    <img src="/assets/icons/tickIcon.png" alt="tickIcon" />
                    <Link target="_blank" href="http://www.islamicfoundation.gov.bd/">ইনোভেশন কর্মপরিকল্পনা</Link>
                  </Box>
                </Box>

                <Box className="socialMedia">
                  <h4>সামাজিক যোগাযোগ</h4>
                  <img src="/assets/images/facebook.png" alt="facebook-logo" />
                </Box>

              </Box>
            </Grid>

            {/* all employee field end */}
          </Grid>
          <Box className="footerTopBg">
            <img src="/assets/images/footer_top_bg.png" alt="footer_top_bg" />
          </Box>
        </Box>


        <Box className="layoutFooter">
          <Grid
            container
            spacing={2}
          >
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Box className="menu">
                <nav>
                  <List>
                    <ListItem><Link href="#">Icon</Link></ListItem>
                    <ListItem><Link href="#">আমাদের সম্পর্কিত</Link>
                      <List>
                        <ListItem><Link href="#">Project</Link></ListItem>
                        <ListItem><Link href="#">Videos</Link></ListItem>
                        <ListItem><Link href="#">Tutorials</Link>

                          <List>
                            <ListItem><Link href="#">HTML/CSS</Link></ListItem>
                            <ListItem><Link href="#">Javascript</Link></ListItem>
                            <ListItem><Link href="#">UI Trend</Link>

                            </ListItem>
                          </List>
                        </ListItem>
                      </List>
                    </ListItem>
                    <ListItem><Link href="#">প্রশিক্ষাণ</Link></ListItem>

                  </List>
                </nav>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Box className="allOfficeLogo">
                <Box className="simecLogo">
                  <img src="/assets/simec-ltd-logo.png" alt="simec-logo" />
                </Box>
                <Box className="islamicFoundationLogo">
                  <img src="/assets/if.png" alt="islamic-foundation-logo" />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default HomeLandingPage