window.CLIENT_TESTS = {
  q1a: `
from solution import transfer_employee

db = {"IT": ["Alice", "Bob"], "Marketing": ["Charlie"]}
result = transfer_employee(db, "Alice", "IT", "Marketing")
assert result is None
assert db == {"IT": ["Bob"], "Marketing": ["Charlie", "Alice"]}

db = {"IT": ["Bob"], "HR": []}
transfer_employee(db, "Alice", "IT", "HR")
assert db == {"IT": ["Bob"], "HR": []}

db = {"IT": ["Bob"], "HR": []}
transfer_employee(db, "Bob", "Sales", "HR")
assert db == {"IT": ["Bob"], "HR": []}
`,
  q1b: `
from solution import get_restructured_db

db = {"IT": ["Alice"], "Sales": ["Bob"], "HR": ["Charlie"]}
new_db = get_restructured_db(db, ["Sales", "HR"])
assert new_db == {"IT": ["Alice"]}
assert db == {"IT": ["Alice"], "Sales": ["Bob"], "HR": ["Charlie"]}

db["IT"].append("Dana")
assert new_db == {"IT": ["Alice"]}, "The returned database should be a deep copy."
`,
  q2a: `
from solution import record_scan

open("scans.log", "w").write("Start:")
assert record_scan("scans.log", " Passenger cleared.") is None
record_scan("scans.log", " ID verified.")
assert open("scans.log").read() == "Start: Passenger cleared. ID verified."

open("empty.log", "w").write("")
record_scan("empty.log", "First")
assert open("empty.log").read() == "First"
`,
  q2b: `
from solution import extract_contraband

open("scans.log", "w").write(
    "INFO: Bag scanned successfully\\n"
    "CONTRABAND: Prohibited liquid detected\\n"
    "warning: contraband lowercase ignored\\n"
    "WARNING: Metal detector triggered\\n"
    "ALERT CONTRABAND package\\n"
)
assert extract_contraband("scans.log", "seized_items.txt") is None
expected = (
    "[CONFISCATED]: CONTRABAND: Prohibited liquid detected\\n"
    "[CONFISCATED]: ALERT CONTRABAND package\\n"
)
assert open("seized_items.txt").read() == expected
`,
  q3a: `
from solution import extract_ticket_numbers

text = "The boarded passengers hold TKT-4412, TKT-99, and TKT-100200."
assert extract_ticket_numbers(text) == ["TKT-4412", "TKT-100200"]
assert extract_ticket_numbers("TKT-1234 TKT-00001 bad TKT-12") == ["TKT-1234", "TKT-00001"]
assert extract_ticket_numbers("preTKT-9876 and TKT-4567") == ["TKT-9876", "TKT-4567"]
`,
  q3b: `
from solution import count_ticket_classes

passengers = [
    {"ticket_class": "Economy", "name": "Alice"},
    {"ticket_class": "Business", "name": "Bob"},
    {"ticket_class": "Economy", "name": "Charlie"},
    {"ticket_class": "First", "name": "Dana"},
]
result = count_ticket_classes(passengers)
assert result["Economy"] == 2
assert result["Business"] == 1
assert result["First"] == 1
assert result.name == "ticket_class"
`,
  q4a: `
from solution import PowerBank

assert PowerBank.MAX_CHARGE == 10000.0
anker = PowerBank("AnkerPro", 12000.0)
assert anker.brand_name == "AnkerPro"
assert anker.charge_level == 10000.0
generic = PowerBank("NoName", -500.0)
assert generic.charge_level == 0.0
normal = PowerBank("ChargeMax", 2500.5)
assert normal.charge_level == 2500.5
`,
  q4b: `
from solution import PowerBank

my_bank = PowerBank("ChargeMax", 2000.0)
assert my_bank.charge_device(1500.0) == "Device charged using 1500.0 mAh"
assert my_bank.charge_level == 500.0
assert my_bank.charge_device(1000.0) == "Power bank depleted after 500.0 mAh"
assert my_bank.charge_level == 0.0

full = PowerBank("Full", 100.0)
assert full.charge_device(0.0) == "Device charged using 0.0 mAh"
assert full.charge_level == 100.0
`,
  q5a: `
from solution import clamp_scores

scores = [88, -4, 105, 72, 100]
result = clamp_scores(scores)
assert result is None
assert scores == [88, 0, 100, 72, 100]

scores = []
clamp_scores(scores)
assert scores == []
`,
  q5b: `
from solution import rotate_queue

queue = ["Alice", "Bob", "Charlie"]
result = rotate_queue(queue)
assert result == "Alice"
assert queue == ["Bob", "Charlie", "Alice"]

empty = []
assert rotate_queue(empty) is None
assert empty == []
`,
  q6a: `
from solution import write_numbered_lines

open("notes.txt", "w").write("alpha\\nbeta\\ngamma")
assert write_numbered_lines("notes.txt", "numbered.txt") is None
assert open("numbered.txt").read() == "1: alpha\\n2: beta\\n3: gamma\\n"

open("empty.txt", "w").write("")
write_numbered_lines("empty.txt", "out.txt")
assert open("out.txt").read() == ""
`,
  q6b: `
from solution import read_config

open("settings.txt", "w").write(
    "# app settings\\n"
    "theme = dark\\n"
    "retries=3\\n"
    "\\n"
    "safe_mode = true\\n"
)
assert read_config("settings.txt") == {
    "theme": "dark",
    "retries": "3",
    "safe_mode": "true",
}
`,
  q7a: `
from solution import calculate_circle_areas
import math

areas = calculate_circle_areas([1, 2.5, 0])
assert len(areas) == 3
assert abs(areas[0] - math.pi) < 0.000001
assert abs(areas[1] - (math.pi * 2.5 * 2.5)) < 0.000001
assert areas[2] == 0
`,
  q7b: `
from solution import choose_top_students

records = [
    {"name": "Mina", "score": 81},
    {"name": "Alex", "score": 95},
    {"name": "Zoe", "score": 95},
    {"name": "Ben", "score": 70},
]
assert choose_top_students(records, 2) == ["Alex", "Zoe"]
assert choose_top_students(records, 10) == ["Alex", "Zoe", "Mina", "Ben"]
`,
  q8a: `
from solution import LibraryBook

book = LibraryBook("Python Basics", "Dr Lee")
assert book.title == "Python Basics"
assert book.author == "Dr Lee"
assert book.is_borrowed is False
assert book.borrow() is True
assert book.is_borrowed is True
assert book.borrow() is False
`,
  q8b: `
from solution import LibraryBook

book = LibraryBook("Clean Code", "Robert Martin")
assert book.return_book() is False
book.borrow()
assert book.return_book() is True
assert book.is_borrowed is False
assert book.return_book() is False
`
};
