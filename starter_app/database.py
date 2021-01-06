from dotenv import load_dotenv
import datetime
from datetime import time
load_dotenv()

from app import app, db
from app.models import User, Security_Point,Role, Resource, Encounter, Patient,Order_Type, Provider, Activity, Encounter_Type, Department

with app.app_context():
  db.drop_all()
  db.create_all()

  demo = User(username = 'DemoUser', email = 'demo@aa.io', password ='password', first_name="Angela",last_name="Alegria")
  ian = User(username = 'Angelo', email = 'angelo@health.io', password='password', first_name="Angelo",last_name="Ramirez")
  javier = User(username = 'Javier', email = 'javier@aa.io', password='password', first_name="Martin",last_name="Martinez")
  dean = User(username = 'Dean', email = 'dean@aa.io', password='password', first_name="Oscar",last_name="Holden")
  angela = User(username = 'Angela', email = 'angela@aa.io', password='password', first_name="Jonathan",last_name="Gutierez")
  soonmi = User(username = 'Soon-Mi', email = 'soonmi@aa.io', password='password', first_name="Flor",last_name="Castillo")
  alissa = User(username = 'Alissa', email = 'alissa@aa.io', password='password', first_name="Alissa",last_name="Johnson")

  my_schedule_access = Security_Point(name="provider schedule access")
  orders_access = Security_Point(name="order creation")
  department_schedule_access = Security_Point(name="department schedule access")
  patient_search = Security_Point(name="patient search")
  chart_access = Security_Point(name="chart access")
  patient_checkin_access = Security_Point(name="patient checkin")
  patient_registration_access = Security_Point(name="patient registration")
  patient_user_access = Security_Point(name="patient user access")

  demo_provider =Provider(specialty="Family Medicine")
  demo_patient = Patient(firstName="Clare",lastName="Donohue-Meyer",dob = datetime.datetime(1993, 6, 22), sex="female", address_line_one ="221B Baker St.",address_city="Austin",address_state="TX",address_zip="78731",bmi="22.74",beats_per_minute="115/75",weight="112",height="5'4''",ethnicity="White",picture="https://saga-health.s3-us-west-1.amazonaws.com/Tulsa-Headshot-Photographer_9639a.jpg",smoker="yes",occupation="Writer",mobile_phone="(832) 370-8893", home_phone="(281) 349-8893", work_phone="(409) 342-8144")
  rosemary = Patient(firstName="Rosemary",lastName="Boxer",dob = datetime.datetime(1926, 8, 11), sex="female", address_line_one ="4909 23rd St.",address_city="Austin",address_state="TX",address_zip="78704")
  thyme = Patient(firstName="Laura",lastName="Thyme",dob = datetime.datetime(1930, 2, 9), sex="female", address_line_one ="3038 Mason Rd.",address_city="Austin",address_state="TX",address_zip="78718")
  severus = Patient(firstName="Severus",lastName="Snape",dob = datetime.datetime(1967, 7, 19), sex="male", address_line_one ="7677 W. 15th St.",address_city="Austin",address_state="TX",address_zip="78712")
  watson = Patient(firstName="John H.",lastName="Watson",dob = datetime.datetime(1960, 8, 19), sex="male", address_line_one ="2810 Baker St.",address_city="Austin",address_state="TX",address_zip="78710")
  aurelio = Patient(firstName="Aureliano",lastName="Buendia",dob = datetime.datetime(1931, 3, 15), sex="male", address_line_one ="2020 Macondo St.",address_city="Austin",address_state="TX",address_zip="78710")
  juan = Patient(firstName="Juan-Jose",lastName="Arcadio",dob = datetime.datetime(1930, 3, 15), sex="male", address_line_one ="2013 Macondo St.",address_city="Austin",address_state="TX",address_zip="78711")
  jacob = Patient(firstName="Ursula",lastName="Buendia",dob = datetime.datetime(1913, 5, 15), sex="female", address_line_one ="2020 Macondo St.",address_city="Austin",address_state="TX",address_zip="78721")
  philip = Patient(firstName="Philip",lastName="Marlowe",dob = datetime.datetime(1920, 3, 15), sex="male", address_line_one ="2012 Tea St.",address_city="Austin",address_state="TX",address_zip="78714")
  jo = Patient(firstName="Jo",lastName="March",dob = datetime.datetime(1920, 3, 15), sex="female", address_line_one ="7819 Alcott St.",address_city="Austin",address_state="TX",address_zip="78710")
  clarice = Patient(firstName="Clarice",lastName="Starling",dob = datetime.datetime(1924, 12, 15), sex="female", address_line_one ="7819 Tremor St.",address_city="Austin",address_state="TX",address_zip="78710")
  sarah = Patient(firstName="Sarah",lastName="Connor",dob = datetime.datetime(1945, 2, 15), sex="female", address_line_one ="7819 Tomorrow Ln.",address_city="Austin",address_state="TX",address_zip="78710")
  elizabeth = Patient(firstName="Elizabeth",lastName="Bennet",dob = datetime.datetime(1994, 3, 15), sex="female", address_line_one ="7834 Austen St.",address_city="Austin",address_state="TX",address_zip="78710")

  my_schedule = Activity(name="My Schedule")
  my_schedule.security_point = my_schedule_access
  orders = Activity(name="Place Orders")
  orders.security_point = orders_access
  department_schedule = Activity(name="Dep. Schedule")
  department_schedule.security_point = department_schedule_access
  search_patients = Activity(name="Patient Search")
  search_patients.security_point = patient_search
  patient_chart = Activity(name="chart")
  patient_chart.security_point = chart_access
  patient_checkin = Activity(name="Patient Check-in")
  patient_checkin.security_point = patient_checkin_access
  patient_registration = Activity(name="Patient Registration")
  patient_registration.security_point = patient_registration_access

  encounter_one = Encounter(date=datetime.datetime(2020,10,21),start=datetime.datetime(2020,10,21,10,30),end=datetime.datetime(2020,10,21,11,30))
  provider_role = Role(name="provider")
  encounter_two = Encounter(date=datetime.datetime(2020,10,21),start=datetime.datetime(2020,10,21,10,30),end=datetime.datetime(2020,10,21,11,30))
  encounter_three = Encounter(date=datetime.datetime(2020,10,21),start=datetime.datetime(2020,10,21,16,30),end=datetime.datetime(2020,10,21,17,30))
  encounter_four = Encounter(date=datetime.datetime(2020,10,22),start=datetime.datetime(2020,10,21,13,30),end=datetime.datetime(2020,10,21,14,30))
  encounter_five = Encounter(date=datetime.datetime(2020,10,23),start=datetime.datetime(2020,10,19,14,30),end=datetime.datetime(2020,10,19,15,30))
  encounter_six = Encounter(date=datetime.datetime(2020,10,20),start=datetime.datetime(2020,10,20,8,30),end=datetime.datetime(2020,10,20,10,30))
  encounter_seven = Encounter(date=datetime.datetime(2020,10,26),start=datetime.datetime(2020,10,26,10,30),end=datetime.datetime(2020,10,20,11,30))
  encounter_eight = Encounter(date=datetime.datetime(2020,10,28),start=datetime.datetime(2020,10,28,11,30),end=datetime.datetime(2020,10,28,12,30))
  encounter_nine = Encounter(date=datetime.datetime(2020,10,13),start=datetime.datetime(2020,10,13,10,30),end=datetime.datetime(2020,10,13,11,30))
  encounter_ten = Encounter(date=datetime.datetime(2020,10,19),start=datetime.datetime(2020,10,19,8,30),end=datetime.datetime(2020,10,19,9,30))
  encounter_eleven = Encounter(date=datetime.datetime(2020,10,22),start=datetime.datetime(2020,10,22,8,30),end=datetime.datetime(2020,10,22,9,30))
  appointment_encounter_type = Encounter_Type(name="Outpatient Appointment")
  appointment_encounter_type.encounters.append(encounter_two)
  appointment_encounter_type.encounters.append(encounter_one)
  appointment_encounter_type.encounters.append(encounter_three)
  appointment_encounter_type.encounters.append(encounter_four)
  appointment_encounter_type.encounters.append(encounter_five)
  appointment_encounter_type.encounters.append(encounter_six)
  appointment_encounter_type.encounters.append(encounter_seven)
  appointment_encounter_type.encounters.append(encounter_eight)
  appointment_encounter_type.encounters.append(encounter_nine)
  appointment_encounter_type.encounters.append(encounter_ten)
  appointment_encounter_type.encounters.append(encounter_eleven)

  demo_provider.encounters.append(encounter_eight)
  demo_provider.encounters.append(encounter_seven)
  demo_provider.encounters.append(encounter_six)  
  demo_provider.encounters.append(encounter_five)
  demo_provider.encounters.append(encounter_four)
  demo_provider.encounters.append(encounter_three)
  demo_provider.encounters.append(encounter_two)
  demo_provider.encounters.append(encounter_one)
  demo_provider.encounters.append(encounter_eleven)
  demo_provider.encounters.append(encounter_ten)
  demo_provider.encounters.append(encounter_nine)

  radiology_department = Department(name="Radiology")
  fam_department = Department(name="Outpatient Family Medicine")

  exam_room_a = Resource(name="Exam Room A")
  exam_room_b = Resource(name="Exam Room B")
  exam_room_c = Resource(name="Exam Room C")
  exam_room_d = Resource(name="Exam Room D")
  
  exam_room_a.encounters.append(encounter_one)
  exam_room_b.encounters.append(encounter_two)
  exam_room_c.encounters.append(encounter_three)
  exam_room_d.encounters.append(encounter_four)
  exam_room_d.encounters.append(encounter_five)
  exam_room_d.encounters.append(encounter_six)
  exam_room_a.encounters.append(encounter_seven)
  exam_room_a.encounters.append(encounter_eight)
  exam_room_b.encounters.append(encounter_nine)
  exam_room_c.encounters.append(encounter_ten)
  exam_room_b.encounters.append(encounter_eleven)


  fam_department.encounters.append(encounter_one)
  fam_department.encounters.append(encounter_two)
  fam_department.encounters.append(encounter_three)
  fam_department.encounters.append(encounter_five)
  fam_department.encounters.append(encounter_four)
  fam_department.encounters.append(encounter_six)
  fam_department.encounters.append(encounter_seven)
  fam_department.encounters.append(encounter_eight)
  fam_department.encounters.append(encounter_nine)
  fam_department.encounters.append(encounter_ten)
  fam_department.encounters.append(encounter_eleven)


  fam_department.resources.append(exam_room_a)
  fam_department.resources.append(exam_room_b)
  fam_department.resources.append(exam_room_c)
  fam_department.resources.append(exam_room_d)
  
  appointment_order_type=Order_Type(name="Outpatient Appointment Request")
  fam_department.order_types.append(appointment_order_type)
  fam_department.encounter_types.append(appointment_encounter_type)

  scheduler_role = Role(name="scheduler")
  scheduler_role.users.append(ian)
  demo.roles.append(provider_role)

  

  demo_provider.user = demo
  appointment_encounter_type.encounters.append(encounter_one)
  demo_provider.encounters.append(encounter_one)
  demo_patient.encounters.append(encounter_one)
  provider_role.security_points.append(my_schedule_access)
  provider_role.security_points.append(orders_access)
  provider_role.security_points.append(department_schedule_access)
  provider_role.security_points.append(patient_search)
  provider_role.security_points.append(chart_access)

  scheduler_role.security_points.append(department_schedule_access)
  scheduler_role.security_points.append(patient_registration_access)
  scheduler_role.security_points.append(patient_checkin_access)
  demo_provider.encounters.append(encounter_two)
  demo_provider.encounters.append(encounter_three)
  demo_provider.encounters.append(encounter_four)
  demo_provider.encounters.append(encounter_five)
  demo_provider.encounters.append(encounter_six)
  demo_provider.encounters.append(encounter_seven)
  demo_provider.encounters.append(encounter_eight)
  demo_provider.encounters.append(encounter_nine)
  demo_provider.encounters.append(encounter_ten)
  demo_provider.encounters.append(encounter_eleven)

  demo_patient.encounters.append(encounter_two)
  demo_patient.encounters.append(encounter_three)
  demo_patient.encounters.append(encounter_four)
  demo_patient.encounters.append(encounter_five)
  demo_patient.encounters.append(encounter_six)
  demo_patient.encounters.append(encounter_seven)
  demo_patient.encounters.append(encounter_eight)
  demo_patient.encounters.append(encounter_nine)
  demo_patient.encounters.append(encounter_ten)
  demo_patient.encounters.append(encounter_eleven)

  db.session.add(appointment_order_type)
  db.session.add(encounter_one)
  db.session.add(demo)
  db.session.add(rosemary)
  db.session.add(thyme)
  db.session.add(severus)
  db.session.add(watson)
  db.session.add(aurelio)
  db.session.add(juan) 
  db.session.add(jacob)
  db.session.add(philip)
  db.session.add(jo)
  db.session.add(clarice)
  db.session.add(sarah)
  db.session.add(elizabeth)
  db.session.add(ian)
  db.session.add(javier)
  db.session.add(dean)
  db.session.add(angela)
  db.session.add(soonmi)
  db.session.add(alissa)
  db.session.add(my_schedule_access)
  db.session.add(patient_registration_access)
  db.session.add(patient_checkin_access)
  db.session.add(orders_access)
  db.session.add(department_schedule_access)
  db.session.add(patient_search)
  db.session.add(chart_access)
  db.session.add(patient_user_access)
  db.session.add(my_schedule)
  db.session.add(patient_registration)
  db.session.add(patient_checkin)
  db.session.add(orders)
  db.session.add(department_schedule)
  db.session.add(search_patients)
  db.session.add(patient_chart)
  db.session.add(provider_role )
  db.session.add(scheduler_role)
  db.session.add(demo_patient)
  db.session.add(demo_provider)


  db.session.commit()