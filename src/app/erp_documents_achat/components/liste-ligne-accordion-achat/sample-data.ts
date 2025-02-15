export interface People {
  surname: string;
  forename: string;
  gender: string;
  ukCity: string;
  salary: string;
  department: string;
}

// Randomly generated using top 200 lists for surname, male name, female name and uk city
const people: People[] = [
  {surname: 'Campbell', forename: 'Helen', gender: 'Female', ukCity: 'Burnley', salary: '£10 to £20k', department: 'Accounts'},
  {surname: 'Walker', forename: 'Shirley', gender: 'Female', ukCity: 'Oxford', salary: '£80 to £90k', department: 'Accounts'},
  {surname: 'Nguyen', forename: 'Marie', gender: 'Female', ukCity: 'Lisburn', salary: '£80 to £90k', department: 'Accounts'},
  {surname: 'Bailey', forename: 'Kenneth', gender: 'Male', ukCity: 'Mansfield', salary: '£80 to £90k', department: 'Sales'},
  {surname: 'Mitchell', forename: 'David', gender: 'Male', ukCity: 'Exeter', salary: '£10 to £20k', department: 'HR'},
  {surname: 'Bryant', forename: 'Connie', gender: 'Female', ukCity: 'Reading', salary: '£40 to £50k', department: 'Operations'},
  {surname: 'Gomez', forename: 'Ida', gender: 'Female', ukCity: 'Plymouth', salary: '£20 to £30k', department: 'HR'},
  {surname: 'Peters', forename: 'Richard', gender: 'Male', ukCity: 'StHelen’s', salary: '£70 to £80k', department: 'HR'},
  {surname: 'Howard', forename: 'Amanda', gender: 'Female', ukCity: 'Gosport', salary: '£40 to £50k', department: 'Operations'},
  {surname: 'Tran', forename: 'Joshua', gender: 'Male', ukCity: 'Colchester', salary: '£80 to £90k', department: 'IT'},
  {surname: 'Nichols', forename: 'Annie', gender: 'Female', ukCity: 'Gateshead', salary: '£90 and over', department: 'Accounts'},
  {surname: 'Russell', forename: 'James', gender: 'Male', ukCity: 'Dunfermline', salary: '£10 to £20k', department: 'IT'},
  {surname: 'Ward', forename: 'Antonio', gender: 'Male', ukCity: 'Ipswich', salary: '£90 and over', department: 'Sales'},
  {surname: 'Marshall', forename: 'David', gender: 'Male', ukCity: 'Halifax', salary: '£10 to £20k', department: 'Marketing'},
  {surname: 'Howard', forename: 'Ronnie', gender: 'Male', ukCity: 'Oxford', salary: '£40 to £50k', department: 'HR'},
  {surname: 'James', forename: 'Pamela', gender: 'Female', ukCity: 'Wallasey', salary: '£60 to £70k', department: 'IT'},
  {surname: 'Long', forename: 'Jerry', gender: 'Male', ukCity: 'Coventry', salary: '£60 to £70k', department: 'Operations'},
  {surname: 'Kelley', forename: 'Mildred', gender: 'Female', ukCity: 'Dewsbury', salary: '£80 to £90k', department: 'Marketing'},
  {surname: 'Jenkins', forename: 'Karen', gender: 'Female', ukCity: 'Maidenhead', salary: '£80 to £90k', department: 'Legal'},
  {surname: 'Thomas', forename: 'Sue', gender: 'Female', ukCity: 'Gosport', salary: '£80 to £90k', department: 'IT'},
  {surname: 'Hughes', forename: 'Stephanie', gender: 'Female', ukCity: 'Keighley', salary: '£30 to £40k', department: 'Marketing'},
  {surname: 'King', forename: 'Rachel', gender: 'Female', ukCity: 'Dunfermline', salary: '£10 to £20k', department: 'Accounts'},
  {surname: 'Mendoza', forename: 'Joshua', gender: 'Male', ukCity: 'Wigan', salary: 'Upto £10k', department: 'Marketing'},
  {surname: 'Cruz', forename: 'Patrick', gender: 'Male', ukCity: 'Sheffield', salary: 'Upto £10k', department: 'IT'},
  {surname: 'Peters', forename: 'Dorothy', gender: 'Female', ukCity: 'Aylesbury', salary: '£20 to £30k', department: 'HR'},
  {surname: 'Simmons', forename: 'Corey', gender: 'Male', ukCity: 'Oldham', salary: '£40 to £50k', department: 'Legal'},
  {surname: 'Brooks', forename: 'Leslie', gender: 'Female', ukCity: 'Gloucester', salary: 'Upto £10k', department: 'IT'},
  {surname: 'Boyd', forename: 'Gerald', gender: 'Male', ukCity: 'Rochester', salary: '£20 to £30k', department: 'Operations'},
  {surname: 'Patel', forename: 'Monica', gender: 'Female', ukCity: 'Rotherham', salary: '£30 to £40k', department: 'Accounts'},
  {surname: 'Medina', forename: 'Warren', gender: 'Male', ukCity: 'Sittingbourne', salary: 'Upto £10k', department: 'HR'},
  {surname: 'Henderson', forename: 'Nathan', gender: 'Male', ukCity: 'Luton', salary: '£50 to £60k', department: 'Legal'},
  {surname: 'Cooper', forename: 'Warren', gender: 'Male', ukCity: 'Leeds', salary: '£30 to £40k', department: 'Legal'},
  {surname: 'Jackson', forename: 'Heather', gender: 'Female', ukCity: 'Bootle', salary: '£90 and over', department: 'HR'},
  {surname: 'Stephens', forename: 'Jeremy', gender: 'Male', ukCity: 'Bolton', salary: '£40 to £50k', department: 'Sales'},
  {surname: 'Woods', forename: 'Bobby', gender: 'Male', ukCity: 'Bradford', salary: '£30 to £40k', department: 'Marketing'},
  {surname: 'Brooks', forename: 'Jeffrey', gender: 'Male', ukCity: 'Kirkcaldy', salary: '£90 and over', department: 'Accounts'},
  {surname: 'Murray', forename: 'Jim', gender: 'Male', ukCity: 'Stoke-on-Trent', salary: '£20 to £30k', department: 'Operations'},
  {surname: 'Powell', forename: 'Denise', gender: 'Female', ukCity: 'Worcester', salary: '£30 to £40k', department: 'Accounts'},
  {surname: 'Reynolds', forename: 'Norma', gender: 'Female', ukCity: 'EastKilbride', salary: '£60 to £70k', department: 'Operations'},
  {surname: 'Carter', forename: 'Marion', gender: 'Female', ukCity: 'Clacton-on-Sea', salary: '£50 to £60k', department: 'Sales'},
  {surname: 'Freeman', forename: 'Tim', gender: 'Male', ukCity: 'Cheltenham', salary: '£70 to £80k', department: 'Marketing'},
  {surname: 'Simpson', forename: 'Ernest', gender: 'Male', ukCity: 'Rochdale', salary: '£70 to £80k', department: 'Accounts'},
  {surname: 'Roberts', forename: 'Jorge', gender: 'Male', ukCity: 'Bolton', salary: 'Upto £10k', department: 'Legal'},
  {surname: 'Long', forename: 'Jack', gender: 'Male', ukCity: 'Corby', salary: '£40 to £50k', department: 'Operations'},
  {surname: 'Fisher', forename: 'Bertha', gender: 'Female', ukCity: 'Lowestoft', salary: '£80 to £90k', department: 'HR'},
  {surname: 'Owens', forename: 'Gloria', gender: 'Female', ukCity: 'Grays', salary: '£30 to £40k', department: 'Marketing'},
  {surname: 'Brown', forename: 'Martha', gender: 'Female', ukCity: 'EllesmerePort', salary: '£10 to £20k', department: 'Marketing'},
  {surname: 'Smith', forename: 'Cheryl', gender: 'Female', ukCity: 'Solihull', salary: '£60 to £70k', department: 'Operations'},
  {surname: 'Young', forename: 'James', gender: 'Male', ukCity: 'Gravesend', salary: '£70 to £80k', department: 'Accounts'},
  {surname: 'Payne', forename: 'Frances', gender: 'Female', ukCity: 'Norwich', salary: 'Upto £10k', department: 'Legal'},
  {surname: 'Gomez', forename: 'Bryan', gender: 'Male', ukCity: 'Wolverhampton', salary: '£80 to £90k', department: 'IT'},
  {surname: 'Ruiz', forename: 'Jon', gender: 'Male', ukCity: 'Doncaster', salary: '£40 to £50k', department: 'IT'},
  {surname: 'Woods', forename: 'Sheila', gender: 'Female', ukCity: 'Cheltenham', salary: '£60 to £70k', department: 'Operations'},
  {surname: 'Long', forename: 'Ruth', gender: 'Female', ukCity: 'Keighley', salary: '£70 to £80k', department: 'Operations'},
  {surname: 'James', forename: 'Alfred', gender: 'Male', ukCity: 'Lisburn', salary: '£30 to £40k', department: 'IT'},
  {surname: 'Ortiz', forename: 'Jerome', gender: 'Male', ukCity: 'Rugby', salary: '£80 to £90k', department: 'IT'},
  {surname: 'Williams', forename: 'Charlie', gender: 'Male', ukCity: 'Crosby', salary: 'Upto £10k', department: 'Accounts'},
  {surname: 'Medina', forename: 'Martha', gender: 'Female', ukCity: 'Maidenhead', salary: '£10 to £20k', department: 'Accounts'},
  {surname: 'Porter', forename: 'Randy', gender: 'Male', ukCity: 'Canterbury', salary: '£90 and over', department: 'IT'},
  {surname: 'Kim', forename: 'Jerry', gender: 'Male', ukCity: 'Cannock', salary: '£90 and over', department: 'Sales'},
  {surname: 'Schmidt', forename: 'Dana', gender: 'Female', ukCity: 'Brentwood', salary: '£20 to £30k', department: 'Marketing'},
  {surname: 'Porter', forename: 'Lucille', gender: 'Female', ukCity: 'Ewell', salary: '£90 and over', department: 'Operations'},
  {surname: 'Castro', forename: 'Janet', gender: 'Female', ukCity: 'Gillingham', salary: '£10 to £20k', department: 'Accounts'},
  {surname: 'Gonzalez', forename: 'Louise', gender: 'Female', ukCity: 'Stourbridge', salary: '£70 to £80k', department: 'Operations'},
  {surname: 'Morgan', forename: 'Jerry', gender: 'Male', ukCity: 'Derby', salary: '£40 to £50k', department: 'HR'},
  {surname: 'Elliott', forename: 'Bernice', gender: 'Female', ukCity: 'Weston-super-Mare', salary: '£50 to £60k', department: 'Operations'},
  {surname: 'Thompson', forename: 'June', gender: 'Female', ukCity: 'Paisley', salary: '£10 to £20k', department: 'Marketing'},
  {surname: 'Stewart', forename: 'Richard', gender: 'Male', ukCity: 'Worcester', salary: '£80 to £90k', department: 'Marketing'},
  {surname: 'Young', forename: 'Alicia', gender: 'Female', ukCity: 'Chester', salary: '£50 to £60k', department: 'HR'},
  {surname: 'Price', forename: 'Andrew', gender: 'Male', ukCity: 'Kingston-upon-Hull', salary: '£30 to £40k', department: 'Marketing'},
  {surname: 'Butler', forename: 'Cynthia', gender: 'Female', ukCity: 'Burnley', salary: '£90 and over', department: 'HR'},
  {surname: 'Wood', forename: 'Helen', gender: 'Female', ukCity: 'Leicester', salary: '£30 to £40k', department: 'HR'},
  {surname: 'Rose', forename: 'Ida', gender: 'Female', ukCity: 'Hamilton', salary: '£10 to £20k', department: 'Sales'},
  {surname: 'Woods', forename: 'Amanda', gender: 'Female', ukCity: 'Basildon', salary: '£30 to £40k', department: 'Operations'},
  {surname: 'Pierce', forename: 'Alice', gender: 'Female', ukCity: 'Doncaster', salary: '£30 to £40k', department: 'Marketing'},
  {surname: 'Wagner', forename: 'Megan', gender: 'Female', ukCity: 'Shoreham-by-Sea', salary: '£40 to £50k', department: 'Legal'},
  {surname: 'Mcdonald', forename: 'Earl', gender: 'Male', ukCity: 'Exeter', salary: '£20 to £30k', department: 'Accounts'},
  {surname: 'Gomez', forename: 'Ray', gender: 'Male', ukCity: 'Blackpool', salary: '£40 to £50k', department: 'IT'},
  {surname: 'Chavez', forename: 'Herbert', gender: 'Male', ukCity: 'Swindon', salary: '£20 to £30k', department: 'Operations'},
  {surname: 'Moreno', forename: 'Vernon', gender: 'Male', ukCity: 'Paignton', salary: '£40 to £50k', department: 'Operations'},
  {surname: 'Lee', forename: 'Leroy', gender: 'Male', ukCity: 'Hereford', salary: '£30 to £40k', department: 'Operations'},
  {surname: 'Clark', forename: 'Robin', gender: 'Female', ukCity: 'Blackburn', salary: '£60 to £70k', department: 'Accounts'},
  {surname: 'Gutierrez', forename: 'Terry', gender: 'Male', ukCity: 'Hartlepool', salary: '£10 to £20k', department: 'Marketing'},
  {surname: 'Taylor', forename: 'Frank', gender: 'Male', ukCity: 'Stockton-on-Tees', salary: '£20 to £30k', department: 'Marketing'},
  {surname: 'Gibson', forename: 'Billy', gender: 'Male', ukCity: 'Maidenhead', salary: '£40 to £50k', department: 'Marketing'},
  {surname: 'Hart', forename: 'Gladys', gender: 'Female', ukCity: 'Rochester', salary: '£50 to £60k', department: 'Marketing'},
  {surname: 'Ortiz', forename: 'Peggy', gender: 'Female', ukCity: 'York', salary: '£90 and over', department: 'HR'},
  {surname: 'Ramirez', forename: 'Steve', gender: 'Male', ukCity: 'Rayleigh', salary: '£60 to £70k', department: 'Marketing'},
  {surname: 'Hunt', forename: 'Julia', gender: 'Female', ukCity: 'Southend-on-Sea', salary: '£90 and over', department: 'IT'},
  {surname: 'Simmons', forename: 'Pamela', gender: 'Female', ukCity: 'Corby', salary: '£20 to £30k', department: 'Accounts'},
  {surname: 'Kennedy', forename: 'Sandra', gender: 'Female', ukCity: 'Stafford', salary: '£40 to £50k', department: 'Sales'},
  {surname: 'Hamilton', forename: 'Leon', gender: 'Male', ukCity: 'London', salary: '£10 to £20k', department: 'Legal'},
  {surname: 'Payne', forename: 'Alma', gender: 'Female', ukCity: 'Littlehampton', salary: '£90 and over', department: 'Legal'},
  {surname: 'Richardson', forename: 'Cindy', gender: 'Female', ukCity: 'Weymouth', salary: '£70 to £80k', department: 'Accounts'},
  {surname: 'Gonzales', forename: 'Benjamin', gender: 'Male', ukCity: 'Swindon', salary: '£30 to £40k', department: 'Sales'},
  {surname: 'Lopez', forename: 'Tiffany', gender: 'Female', ukCity: 'Edinburgh', salary: '£90 and over', department: 'Legal'},
  {surname: 'Gibson', forename: 'Tammy', gender: 'Female', ukCity: 'Kidderminster', salary: '£10 to £20k', department: 'Legal'},
  {surname: 'Wagner', forename: 'Jill', gender: 'Female', ukCity: 'Hastings', salary: '£40 to £50k', department: 'Operations'},
  {surname: 'Lewis', forename: 'Veronica', gender: 'Female', ukCity: 'Rugby', salary: '£40 to £50k', department: 'Operations'},
  {surname: 'Hunt', forename: 'Charlie', gender: 'Male', ukCity: 'StHelen’s', salary: '£90 and over', department: 'Accounts'},
  {surname: 'Ryan', forename: 'Alex', gender: 'Male', ukCity: 'Poole', salary: '£30 to £40k', department: 'Marketing'},
  {surname: 'Simpson', forename: 'Dennis', gender: 'Male', ukCity: 'Keighley', salary: '£80 to £90k', department: 'Accounts'},
  {surname: 'Medina', forename: 'Ricardo', gender: 'Male', ukCity: 'Kingswinford', salary: '£30 to £40k', department: 'HR'},
  {surname: 'Murray', forename: 'Gordon', gender: 'Male', ukCity: 'Hove', salary: '£60 to £70k', department: 'IT'},
  {surname: 'Moreno', forename: 'Albert', gender: 'Male', ukCity: 'Loughborough', salary: '£80 to £90k', department: 'Sales'},
  {surname: 'Green', forename: 'Christine', gender: 'Female', ukCity: 'Corby', salary: '£40 to £50k', department: 'Legal'},
  {surname: 'Henry', forename: 'Debra', gender: 'Female', ukCity: 'Northampton', salary: 'Upto £10k', department: 'Legal'},
  {surname: 'Bennett', forename: 'Paul', gender: 'Male', ukCity: 'Weymouth', salary: '£40 to £50k', department: 'IT'},
  {surname: 'Fernandez', forename: 'Joshua', gender: 'Male', ukCity: 'Eastleigh', salary: '£70 to £80k', department: 'Legal'},
  {surname: 'Cruz', forename: 'Tyler', gender: 'Male', ukCity: 'Liverpool', salary: '£60 to £70k', department: 'Operations'},
  {surname: 'Hunter', forename: 'Dale', gender: 'Male', ukCity: 'StAlban’s', salary: '£40 to £50k', department: 'Legal'},
  {surname: 'Weaver', forename: 'Crystal', gender: 'Female', ukCity: 'Birmingham', salary: '£80 to £90k', department: 'HR'},
  {surname: 'Woods', forename: 'Nathan', gender: 'Male', ukCity: 'Waterlooville', salary: '£40 to £50k', department: 'Marketing'},
  {surname: 'Davis', forename: 'Annie', gender: 'Female', ukCity: 'Norwich', salary: '£70 to £80k', department: 'Operations'},
  {surname: 'Brown', forename: 'Bill', gender: 'Male', ukCity: 'Dartford', salary: '£50 to £60k', department: 'IT'},
  {surname: 'Nelson', forename: 'Andrew', gender: 'Male', ukCity: 'Londonderry', salary: '£10 to £20k', department: 'Marketing'},
  {surname: 'Jimenez', forename: 'Kristen', gender: 'Female', ukCity: 'Gosport', salary: '£50 to £60k', department: 'Marketing'},
  {surname: 'Thompson', forename: 'Troy', gender: 'Male', ukCity: 'Southend-on-Sea', salary: '£10 to £20k', department: 'IT'},
  {surname: 'Henderson', forename: 'Regina', gender: 'Female', ukCity: 'Watford', salary: '£10 to £20k', department: 'Marketing'},
  {surname: 'Simmons', forename: 'Louis', gender: 'Male', ukCity: 'Liverpool', salary: '£30 to £40k', department: 'Marketing'},
  {surname: 'Ortiz', forename: 'Billy', gender: 'Male', ukCity: 'Dundee', salary: '£50 to £60k', department: 'Marketing'},
  {surname: 'Gonzales', forename: 'Louise', gender: 'Female', ukCity: 'Aylesbury', salary: '£70 to £80k', department: 'Operations'},
  {surname: 'Simpson', forename: 'Janice', gender: 'Female', ukCity: 'Burnley', salary: '£70 to £80k', department: 'IT'},
  {surname: 'Davis', forename: 'Jeanne', gender: 'Female', ukCity: 'Basildon', salary: '£50 to £60k', department: 'Legal'},
  {surname: 'Johnson', forename: 'Lester', gender: 'Male', ukCity: 'Dunfermline', salary: '£20 to £30k', department: 'IT'},
  {surname: 'Sanders', forename: 'Herman', gender: 'Male', ukCity: 'Portsmouth', salary: '£70 to £80k', department: 'Operations'},
  {surname: 'Black', forename: 'Stacy', gender: 'Female', ukCity: 'Norwich', salary: '£80 to £90k', department: 'IT'},
  {surname: 'Elliott', forename: 'Lucille', gender: 'Female', ukCity: 'Burnley', salary: '£30 to £40k', department: 'Marketing'},
  {surname: 'Spencer', forename: 'Bobby', gender: 'Male', ukCity: 'Salford', salary: '£40 to £50k', department: 'Sales'},
  {surname: 'Anderson', forename: 'Edwin', gender: 'Male', ukCity: 'Grays', salary: '£90 and over', department: 'Marketing'},
  {surname: 'Daniels', forename: 'Carolyn', gender: 'Female', ukCity: 'HighWycombe', salary: '£10 to £20k', department: 'Marketing'},
  {surname: 'Hughes', forename: 'Diane', gender: 'Female', ukCity: 'Kingston-upon-Hull', salary: '£90 and over', department: 'Legal'},
  {surname: 'Perry', forename: 'Eva', gender: 'Female', ukCity: 'York', salary: '£60 to £70k', department: 'IT'},
  {surname: 'Davis', forename: 'Anita', gender: 'Female', ukCity: 'Corby', salary: '£60 to £70k', department: 'Operations'},
  {surname: 'Thomas', forename: 'Katherine', gender: 'Female', ukCity: 'Reading', salary: '£10 to £20k', department: 'HR'},
  {surname: 'Alvarez', forename: 'Andrew', gender: 'Male', ukCity: 'Dewsbury', salary: '£10 to £20k', department: 'Legal'},
  {surname: 'Lee', forename: 'Patricia', gender: 'Female', ukCity: 'Bath', salary: '£60 to £70k', department: 'HR'},
  {surname: 'Daniels', forename: 'Sally', gender: 'Female', ukCity: 'Scarborough', salary: '£30 to £40k', department: 'IT'},
  {surname: 'Bell', forename: 'Betty', gender: 'Female', ukCity: 'Kettering', salary: '£90 and over', department: 'Legal'},
  {surname: 'Burns', forename: 'Mario', gender: 'Male', ukCity: 'Crewe', salary: 'Upto £10k', department: 'Sales'},
  {surname: 'Hayes', forename: 'Sam', gender: 'Male', ukCity: 'Nottingham', salary: '£60 to £70k', department: 'Legal'},
  {surname: 'Henry', forename: 'Jorge', gender: 'Male', ukCity: 'Gosport', salary: '£50 to £60k', department: 'IT'},
  {surname: 'Alexander', forename: 'Harold', gender: 'Male', ukCity: 'Gateshead', salary: '£60 to £70k', department: 'Marketing'},
  {surname: 'Edwards', forename: 'Francis', gender: 'Male', ukCity: 'Harrogate', salary: '£30 to £40k', department: 'Accounts'},
  {surname: 'Wagner', forename: 'Joshua', gender: 'Male', ukCity: 'Eastleigh', salary: '£70 to £80k', department: 'Sales'},
  {surname: 'Garcia', forename: 'Monica', gender: 'Female', ukCity: 'Luton', salary: '£90 and over', department: 'Operations'},
  {surname: 'Medina', forename: 'Micheal', gender: 'Male', ukCity: 'Crewe', salary: '£70 to £80k', department: 'Sales'},
  {surname: 'Murray', forename: 'Mario', gender: 'Male', ukCity: 'Leicester', salary: '£90 and over', department: 'Marketing'},
  {surname: 'Thomas', forename: 'Aaron', gender: 'Male', ukCity: 'Brentwood', salary: '£30 to £40k', department: 'Operations'},
  {surname: 'Garcia', forename: 'Darlene', gender: 'Female', ukCity: 'Doncaster', salary: '£80 to £90k', department: 'Marketing'},
  {surname: 'Gonzales', forename: 'Herman', gender: 'Male', ukCity: 'Woking', salary: '£60 to £70k', department: 'Legal'},
  {surname: 'Daniels', forename: 'Joanne', gender: 'Female', ukCity: 'Kingston-upon-Hull', salary: '£90 and over', department: 'Marketing'},
  {surname: 'Hall', forename: 'Samuel', gender: 'Male', ukCity: 'Paisley', salary: '£50 to £60k', department: 'Accounts'},
  {surname: 'Thomas', forename: 'Shannon', gender: 'Female', ukCity: 'Grimsby', salary: '£90 and over', department: 'Accounts'},
  {surname: 'Hunter', forename: 'Jason', gender: 'Male', ukCity: 'Christchurch', salary: '£30 to £40k', department: 'Marketing'},
  {surname: 'Morales', forename: 'Kristen', gender: 'Female', ukCity: 'WestBromwich', salary: '£20 to £30k', department: 'IT'},
  {surname: 'Reyes', forename: 'Peter', gender: 'Male', ukCity: 'Oldham', salary: '£60 to £70k', department: 'Operations'},
  {surname: 'Gordon', forename: 'Dolores', gender: 'Female', ukCity: 'Solihull', salary: '£70 to £80k', department: 'Sales'},
  {surname: 'Murphy', forename: 'Darrell', gender: 'Male', ukCity: 'Macclesfield', salary: '£70 to £80k', department: 'IT'},
  {surname: 'Richardson', forename: 'Sharon', gender: 'Female', ukCity: 'Middlesbrough', salary: 'Upto £10k', department: 'Accounts'},
  {surname: 'Marshall', forename: 'Lewis', gender: 'Male', ukCity: 'Gloucester', salary: 'Upto £10k', department: 'IT'},
  {surname: 'Alexander', forename: 'Bernice', gender: 'Female', ukCity: 'Bedford', salary: '£60 to £70k', department: 'HR'},
  {surname: 'Morgan', forename: 'Maria', gender: 'Female', ukCity: 'Belfast', salary: '£50 to £60k', department: 'Sales'},
  {surname: 'Wright', forename: 'Alfred', gender: 'Male', ukCity: 'Littlehampton', salary: '£10 to £20k', department: 'Sales'},
  {surname: 'Gonzalez', forename: 'Katie', gender: 'Female', ukCity: 'Kirkcaldy', salary: '£60 to £70k', department: 'Marketing'},
  {surname: 'Meyer', forename: 'Roberto', gender: 'Male', ukCity: 'Poole', salary: '£20 to £30k', department: 'Legal'},
  {surname: 'Green', forename: 'Michael', gender: 'Male', ukCity: 'Salford', salary: '£90 and over', department: 'Sales'},
  {surname: 'Ruiz', forename: 'Jim', gender: 'Male', ukCity: 'Kingswinford', salary: '£20 to £30k', department: 'Accounts'},
  {surname: 'Gibson', forename: 'Peggy', gender: 'Female', ukCity: 'Stevenage', salary: 'Upto £10k', department: 'Legal'},
  {surname: 'Hawkins', forename: 'Suzanne', gender: 'Female', ukCity: 'Macclesfield', salary: '£40 to £50k', department: 'HR'},
  {surname: 'Torres', forename: 'Mike', gender: 'Male', ukCity: 'Southend-on-Sea', salary: '£80 to £90k', department: 'Legal'},
  {surname: 'Holmes', forename: 'Virginia', gender: 'Female', ukCity: 'Warrington', salary: '£20 to £30k', department: 'Operations'},
  {surname: 'Powell', forename: 'Melvin', gender: 'Male', ukCity: 'Smethwick', salary: '£70 to £80k', department: 'Legal'},
  {surname: 'Ferguson', forename: 'Rodney', gender: 'Male', ukCity: 'Walsall', salary: '£10 to £20k', department: 'Operations'},
  {surname: 'Tran', forename: 'Bruce', gender: 'Male', ukCity: 'Halesowen', salary: '£30 to £40k', department: 'Accounts'},
  {surname: 'Ross', forename: 'Jacob', gender: 'Male', ukCity: 'Cardiff', salary: '£70 to £80k', department: 'Operations'},
  {surname: 'Carter', forename: 'Joyce', gender: 'Female', ukCity: 'Chatham', salary: '£10 to £20k', department: 'Sales'},
  {surname: 'Weaver', forename: 'Joseph', gender: 'Male', ukCity: 'Clacton-on-Sea', salary: '£30 to £40k', department: 'IT'},
  {surname: 'Grant', forename: 'Janice', gender: 'Female', ukCity: 'Doncaster', salary: '£30 to £40k', department: 'IT'},
  {surname: 'Payne', forename: 'Larry', gender: 'Male', ukCity: 'Telford', salary: '£30 to £40k', department: 'Marketing'},
  {surname: 'Olson', forename: 'Warren', gender: 'Male', ukCity: 'Eastleigh', salary: '£50 to £60k', department: 'Sales'},
  {surname: 'Hill', forename: 'Shawn', gender: 'Male', ukCity: 'Shrewsbury', salary: '£90 and over', department: 'Marketing'},
  {surname: 'Tran', forename: 'Samuel', gender: 'Male', ukCity: 'Smethwick', salary: '£30 to £40k', department: 'IT'},
  {surname: 'Lopez', forename: 'George', gender: 'Male', ukCity: 'Halesowen', salary: '£90 and over', department: 'Legal'},
  {surname: 'Hernandez', forename: 'Eleanor', gender: 'Female', ukCity: 'HighWycombe', salary: '£90 and over', department: 'Marketing'},
  {surname: 'Hunter', forename: 'Harry', gender: 'Male', ukCity: 'Leicester', salary: '£60 to £70k', department: 'HR'},
  {surname: 'Grant', forename: 'Carolyn', gender: 'Female', ukCity: 'Tamworth', salary: '£30 to £40k', department: 'Accounts'},
  {surname: 'Wells', forename: 'Thelma', gender: 'Female', ukCity: 'London', salary: '£30 to £40k', department: 'Accounts'},
  {surname: 'Stevens', forename: 'Rebecca', gender: 'Female', ukCity: 'Scunthorpe', salary: 'Upto £10k', department: 'Accounts'},
  {surname: 'Thompson', forename: 'Beth', gender: 'Female', ukCity: 'Chester', salary: '£40 to £50k', department: 'HR'},
  {surname: 'Ross', forename: 'Tammy', gender: 'Female', ukCity: 'Bootle', salary: '£20 to £30k', department: 'HR'},
  {surname: 'Carter', forename: 'Harold', gender: 'Male', ukCity: 'Scarborough', salary: '£10 to £20k', department: 'IT'},
  {surname: 'Cruz', forename: 'Joe', gender: 'Male', ukCity: 'Bangor', salary: '£70 to £80k', department: 'Operations'},
  {surname: 'Snyder', forename: 'Nancy', gender: 'Female', ukCity: 'Worthing', salary: '£60 to £70k', department: 'Sales'},
  {surname: 'Thomas', forename: 'Charlie', gender: 'Male', ukCity: 'Crewe', salary: '£80 to £90k', department: 'IT'},
  {surname: 'Williams', forename: 'Annie', gender: 'Female', ukCity: 'Ewell', salary: '£20 to £30k', department: 'IT'},
  {surname: 'Hoffman', forename: 'Jacob', gender: 'Male', ukCity: 'Swansea', salary: '£20 to £30k', department: 'Marketing'},
  {surname: 'Smith', forename: 'Cynthia', gender: 'Female', ukCity: 'Londonderry', salary: '£40 to £50k', department: 'IT'},
  {surname: 'Ferguson', forename: 'Debra', gender: 'Female', ukCity: 'Salford', salary: '£50 to £60k', department: 'Marketing'},
];

export default people;