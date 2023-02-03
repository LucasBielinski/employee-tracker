INSERT INTO department (id, name)
VALUES (001, "Managment"),
       (002, "Programming"),
       (003, "IT"),
       (004, "HR");
INSERT INTO role (id, title, salary, department_id)   
VALUES (001, "Manager", 80.000, 001),
       (002, "Senior Developer", 70.000, 002),
       (003, "Junior Developer", 65.000, 002),
       (004, "Intern", 50.000, 002),
       (005, "Network Engineer", 100.000, 003),
       (006, "Help Desk", 60.000, 003),
       (007, "Data Entry", 60.000, 003),
       (008, "HR Specialist", 50.000, 004),
       (009, "Lawyer", 100.000, 004);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Lucas", "Bielinski", 001, NULL),
       (002, "Ross", "Ritchey", 001, NULL),
       (003, "Java", "Script", 001, NULL),
       (004, "Reed", "Martin", 002, 003),
       (005, "Jim", "Jenkins", 003, 003),
       (006, "Jessica", "Jimson", 003, 003),
       (007, "Ralph", "Wiggim", 004, 003),
       (008, "Thomas", "Washer", 005, 002),
       (009, "Snake", "Man", 006, 002),
       (010, "Lisa", "Simpson", 006, 002),
       (011, "Robert", "Jones", 007, 002),
       (012, "Zak", "Deerson", 008, 003),
       (013. "Bobby", "Fergus", 009, 003);
