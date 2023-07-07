<!DOCTYPE html>
<html lang="en" dir="ltr">
<?php include_once('inc/head.php'); ?>
<link rel="stylesheet" href="assets/css/bootstrap-datepicker.min.css">

<body>
  <?php
  include_once('inc/nav.php');
  ?>
  <div class="sidebar tabs">
    <div class="container">
      <div class="row">
        <ul id="tabs_control">
          <li id="tab_1" active onclick="wiz_nav('sec_wiz_1');">
            <span class="icon" style="background-image:url('assets/img/profile/members.png')"></span>
            <span class="icon negative" style="background-image:url('assets/img/profile/members_white.png')"></span>
            members
          </li>
          <li id="tab_2" onclick="wiz_nav('sec_wiz_2');">
            <span class="icon" style="background-image:url('assets/img/profile/service.png')"></span>
            <span class="icon negative" style="background-image:url('assets/img/profile/service_white.png')"></span>
            service
          </li>
          <li id="tab_3" onclick="wiz_nav('sec_wiz_3');">
            <span class="icon" style="background-image:url('assets/img/profile/invoice.png')"></span>
            <span class="icon negative" style="background-image:url('assets/img/profile/invoice_white.png')"></span>
            customize
          </li>
          <li id="tab_4" onclick="wiz_nav('sec_wiz_4')">
            <span class="icon" style="background-image:url('assets/img/profile/calendar.png')"></span>
            <span class="icon negative" style="background-image:url('assets/img/profile/calendar_white.png')"></span>
            schedule
          </li>
          <li id="tab_5" onclick="wiz_nav('sec_wiz_5')">
            <span class="icon" style="background-image:url('assets/img/profile/map.png')"></span>
            <span class="icon negative" style="background-image:url('assets/img/profile/map_white.png')"></span>
            address
          </li>
          <li id="tab_6" onclick="wiz_nav('sec_wiz_6')">
            <span class="icon" style="background-image:url('assets/img/profile/check.png')"></span>
            <span class="icon negative" style="background-image:url('assets/img/profile/check_white.png')"></span>
            confirm
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <ul id="progressPills" class="pills">
        <li style="width:16.666%" onclick="wiz_nav('sec_wiz_1')" id="prP_1" hold>
        </li>
        <li style="width:16.666%" onclick="wiz_nav('sec_wiz_2')" id="prP_2">
        </li>
        <li style="width:16.666%" onclick="wiz_nav('sec_wiz_3')" id="prP_3">
        </li>
        <li style="width:16.666%" onclick="wiz_nav('sec_wiz_4')" id="prP_4">
        </li>
        <li style="width:16.666%" onclick="wiz_nav('sec_wiz_5')" id="prP_5">
        </li>
        <li style="width:16.666%" onclick="wiz_nav('sec_wiz_6')" id="prP_6">
        </li>
      </ul>
    </div>
  </div>
  <div id="book_page">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 col-sm-offset-2">
          <div id="section_group" class="section_group">
            
            <div id="sec_wiz_1" class="section" active>
              <div id="employees" style="text-align:center">
                <label style="text-align:center;font-size:18px;display:block" class="as_title" for="">Who Is it For ?</label><br>
                <ul class="review option" style="display:inline-block;">
                  <li onclick="wiz_nav('sec_wiz_2')"><span class="icon" style="background-image:url('assets/img/goodbye.png')"></span> just me</li>
                  <li onclick="wiz_nav('sec_wiz_2')"><span class="icon" style="background-image:url('assets/img/laugh.png')"></span> Duo</li>
                  <li onclick="wiz_nav('sec_wiz_2')"><span class="icon" style="background-image:url('assets/img/thinking-of-someone.png')"></span> Something Else</li>
                </ul>
              </div>
            </div>



            <div id="sec_wiz_2" class="section">
              <div id="page_service_select">
                <div class="top_bar fixed">
                  <span onclick="route_to('people_recieving')" class="icon back_button" style="left:15px"></span>
                  <span class="title">Select Service &amp; Addons</span>
                </div>

                <!-- big service -->
                <div id="service_collection" class="product_collector big">
                  <div id="select_service_carousel" class="owl-carousel owl-theme products">
                    <div class="item_wrapper">
                      <div class="item" onclick="select_service(this)">
                        <div class="bg" style="background-image:url('assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg');">
                        </div>
                        <div class="content">
                          <span class="title">service name</span>

                          <p class="excerpt">Lorem ipsum dolor sit amet consectetur adipisicing elit, consectetur adipisicing elit</p>

                          <span class="rate"> <i>$99.39</i> <span class="colored">(20% off)</span> <b>$79.59</b>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="item_wrapper">
                      <div class="item" onclick="select_service(this)">
                        <div class="bg" style="background-image:url('assets/img/tender-african-woman-relaxing-enjoying-healthy-spa-massage-with-oil.jpg');">
                        </div>
                        <div class="content">
                          <span class="title">service name</span>
                          <p class="excerpt">Lorem ipsum dolor sit amet consectetur adipisicing elit, consectetur
                            adipisicing elit</p>
                          <span class="rate"> <i>$99.39</i> <span class="colored">(20% off)</span> <b>$79.59</b>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="item_wrapper">
                      <div class="item" onclick="select_service(this)">
                        <div class="bg" style="background-image:url('assets/img/pexels-andrea-piacquadio-3764568.jpg');">
                        </div>
                        <div class="content">
                          <span class="title">service name</span>
                          <p class="excerpt">Lorem ipsum dolor sit amet consectetur adipisicing elit, consectetur
                            adipisicing elit</p>
                          <span class="rate"> <i>$99.39</i> <span class="colored">(20% off)</span> <b>$79.59</b>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <br>
                <div class="content" style="padding: 0 25px;">
                  <div class="gen_heading">
                    <h3>Gender Preference</h3>
                  </div>
                  <ul class="time_options">
                    <li id="g_male" onclick="change_view('g_male','gender','page_service_select',true)" class="gender time_option" active="">Male
                    </li>
                    <li id="g_female" onclick="change_view('g_female','gender','page_service_select',true)" class="gender time_option">
                      Female</li>
                    <li id="g_either" onclick="change_view('g_either','gender','page_service_select',true)" class="gender time_option">
                      Either</li>
                  </ul>
                  <!-- time -->
                  <div class="gen_heading">
                    <h3>Select Time</h3>
                  </div>
                  <ul class="time_options">
                    <li id="min_45" onclick="change_view('min_45','time_option','page_service_select',true)" class="time_option">
                      60 min</li>
                    <li id="min_60" onclick="change_view('min_60','time_option','page_service_select',true)" class="time_option">
                      80 min</li>
                    <li id="min_90" onclick="change_view('min_90','time_option','page_service_select',true)" class="time_option">
                      90 min</li>
                  </ul>


                  <br>
                  <div class="gen_heading">
                    <h3>Popular options to consider</h3>
                  </div>
                  <!-- addons -->
                  <div class="product_collector">
                    <div id="addons_carousel" class="owl-carousel owl-theme products">
                      <div class="item_wrapper">
                        <div onclick="toggle_addon(this)" class="item">
                          <div class="bg" style="background-image:url('assets/img/masseur-doing-massage-backbone-man-body-spa-salon-beauty-treatment-concept.jpg');">
                          </div>
                          <div class="content">
                            <span class="title">addon name</span>
                            <span class="rate"> <i>$99.39</i> <span class="colored">(20% off)</span>
                              <b>$79.59</b>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="item_wrapper">
                        <div onclick="toggle_addon(this)" class="item">
                          <div class="bg" style="background-image:url('assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg');">
                          </div>
                          <div class="content">
                            <span class="title">addon name</span>
                            <span class="rate"> <i>$99.39</i> <span class="colored">(20% off)</span>
                              <b>$79.59</b>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="item_wrapper">
                        <div onclick="toggle_addon(this)" class="item">
                          <div class="bg" style="background-image:url('assets/img/tender-african-woman-relaxing-enjoying-healthy-spa-massage-with-oil.jpg');">
                          </div>
                          <div class="content">
                            <span class="title">addon name</span>
                            <span class="rate"> <i>$99.39</i> <span class="colored">(20% off)</span>
                              <b>$79.59</b>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="item_wrapper">
                        <div onclick="toggle_addon(this)" class="item">
                          <div class="bg" style="background-image:url('assets/img/pexels-andrea-piacquadio-3764568.jpg');">
                          </div>
                          <div class="content">
                            <span class="title">addon name</span>
                            <span class="rate"> <i>$99.39</i> <span class="colored">(20% off)</span>
                              <b>$79.59</b>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <br>
                  <button class="button lazy" onclick="wiz_nav('sec_wiz_3')">next</button>
                  <br>
                  <br>
                  <br>

                </div>

              </div>
            </div>


            
            <div id="sec_wiz_3" class="section">
              <br>
              <br>
              <label class="static" for="">Areas of Concern</label>
              <ul class="selectable">
                <li onclick="toggle_tag(this)">pain</li>
                <li onclick="toggle_tag(this)">tension</li>
                <li onclick="toggle_tag(this)">relaxation</li>
                <li onclick="toggle_tag(this)">headaches/migraines</li>
                <li onclick="toggle_tag(this)">stress</li>
                <li onclick="toggle_tag(this)">muscle pain</li>
                <li onclick="toggle_tag(this)">injuries</li>
                <li onclick="toggle_tag(this)">inflation</li>
                <li onclick="toggle_tag(this)">fatigue</li>
                <li onclick="toggle_tag(this)">anxiety</li>
                <li onclick="toggle_tag(this)">incomnia</li>
              </ul>
              <hr>
              <label class="static" for="">Health Conditions</label>
              <ul class="selectable">
                <li onclick="toggle_tag(this)">arthritis</li>
                <li onclick="toggle_tag(this)">cancer</li>
                <li onclick="toggle_tag(this)">digestive disorder</li>
                <li onclick="toggle_tag(this)">fibromyalgia</li>
                <li onclick="toggle_tag(this)">plantar fascilitis</li>
                <li onclick="toggle_tag(this)">pragnency</li>
                <li onclick="toggle_tag(this)">sciatic</li>
              </ul>
              <hr>
              <label class="static" for="">Special consideration</label>
              <ul class="selectable">
                <li onclick="toggle_tag(this)">i prefer griatric massage</li>
                <li onclick="toggle_tag(this)">i am minor</li>
              </ul>
              <hr>
              <label class="static" for="">Massage body part</label>
              <ul class="selectable">
                <li onclick="toggle_tag(this)">arms & hands</li>
                <li onclick="toggle_tag(this)">back</li>
                <li onclick="toggle_tag(this)">feet</li>
                <li onclick="toggle_tag(this)">head</li>
                <li onclick="toggle_tag(this)">legs</li>
                <li onclick="toggle_tag(this)">neck</li>
                <li onclick="toggle_tag(this)">shoulders</li>
                <li onclick="toggle_tag(this)">gluteal region</li>
              </ul>
              <hr>
              <label class="static" for="">Massage pressure</label>
              <ul id="massage_pressure" class="selectable">
                <li onclick="toggle_tag(this,'massage_pressure')">light</li>
                <li onclick="toggle_tag(this,'massage_pressure')">medium</li>
                <li onclick="toggle_tag(this,'massage_pressure')">firm</li>
                <li onclick="toggle_tag(this,'massage_pressure')">deep</li>
              </ul>

              <br><br><br>
              <a href="#">
                <button class="button lazy" onclick="wiz_nav('sec_wiz_4')" type="button" name="button">continue</button>
              </a>
            </div>
            <div id="sec_wiz_4" class="section">
              <br><br>
              <div class="input_group" style="text-align: center;">
                <label class="static" style="font-size:17px" for=""><b>WHEN WOULD YOU LIKE IT ?</b></label>
                <br><br>
                <div style="display:inline-block;" id="datepicker" data-date="17/09/2022"></div>
                <input type="hidden" id="my_hidden_input">
                <br>
                <br>
                <select style="width:auto;display:inline-block;padding:0px 15px" class="input" name="">
                  <option value=""> Select Time </option>
                  <option value="">8:00 am</option>
                  <option value="">9:00 am</option>
                  <option value="">10:00 am</option>
                  <option value="">11:00 am</option>
                  <option value="">12:00 pm</option>
                  <option value="">01:00 pm</option>
                  <option value="">02:00 pm</option>
                  <option value="">03:00 pm</option>
                  <option value="">04:00 pm</option>
                  <option value="">05:00 pm</option>
                  <option value="">06:00 pm</option>
                  <option value="">07:00 pm</option>
                  <option value="">08:00 pm</option>
                  <option value="">09:00 pm</option>
                </select>
                <br><br>
                <br><br>
                <button onclick="wiz_nav('sec_wiz_5')" class="button" type="button" name="button">next</button>
              </div>
            </div>
            <div id="sec_wiz_5" class="section">
              <br><br><br>
              <div id="employees" style="text-align:center">
                <label style="text-align:center;font-size:18px;" class="as_title" for="">address details</label>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-sm-7">
                      <div class="inner">
                        <div class="map">
                          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14009.804601388554!2d77.38583598519591!3d28.616237787899024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cefbfc0af6e6f%3A0xf1bb1ef79e931eea!2sYusufpur%20Chak%20Saberi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1661391086520!5m2!1sen!2sin" height="360" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-5">
                      <div class="inner">
                        <h3>24000 EL Toro Road</h3>
                        <p>Laguna Woods, CA 92653</p>
                      </div>
                      <div class="inner">
                        <label for="">Apt / Suite / Hotel Name &amp; room</label>
                        <input class="input" type="text" name="" value="">
                      </div>
                      <div class="inner">
                        <label for="">Email</label>
                        <br>
                        <input class="input" type="text" name="" value="">
                      </div>
                      <div class="inner">
                        <label for="">Arrival Instructions</label>
                        <br>
                        <textarea class="input" name="name" rows="5"></textarea>
                      </div>
                      <div class="inner">
                      </div>
                    </div>
                    <button onclick="wiz_nav('sec_wiz_6')" class="button" type="button" name="button">review</button>
                  </div>
                </div>
              </div>
            </div>
            <div id="sec_wiz_6" class="section">
              <br><br><br>
              <div id="employees">
                <label style="text-align:center;font-size:18px;" class="as_title" for="">Review</label>
                <ul class="review">
                  <li>
                    <span class="title">Date</span>
                    <span class="value">Thu, May 26 at 8:00 AM</span>
                  </li>
                  <li>
                    <span class="title">Personal Details</span>
                    <span class="value">24000 El Toro Road Laguna Woods, CA 92653</span>
                  </li>
                  <li>
                    <span class="title">Massage Pressure</span>
                    <span class="value">Medium</span>
                  </li>
                  <li>
                    <span class="title">Appointments</span>
                    <span class="value">Sarah's Massage <small>90 min swedish massage</small> </span>
                    <span class="price" style="font-size:20px">$109</span>
                  </li>
                </ul>
                <br>
                <div style="text-align:center">
                  <button class="button" type="button" name="button">checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <?php
  include_once('inc/footer.php');
  include_once('inc/scripts.php');
  ?>
  <script type="text/javascript" src="assets/js/bootstrap-datepicker.min.js"></script>
  <script type="text/javascript" src="assets/js/book.js"></script>
</body>

</html>