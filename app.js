const mainBlock = `\n\nif __name__ == "__main__":\n    # Write any code you need to understand the problem here.\n    pass\n`;
const blankStarter = mainBlock.trimStart();
const powerBankStarter = `if __name__ == "__main__":\n    # Write your code here to implement the PowerBank class\n    pass\n`;
const APP_VERSION = "2026-04-29-structured-descriptions";

const questions = [
  {
    id: "q1a",
    section: "Question 1",
    title: "The Corporate Database",
    part: "Part A: In-Place Modification",
    topic: "Nested dictionaries and list mutation",
    difficulty: "🌶️🌶️",
    file: "question1_part_a.py",
    description: [
      "This question tests how Python handles complex nested objects in memory, especially the difference between modifying an object in-place and protecting the original data from side effects.",
      "<strong>Data Structure Definition:</strong> For both parts, you will work with a company database. This is a dictionary where each key is a department name, and each value is a list of employee names in that department.",
      "<code>company_db = {\"Engineering\": [\"Alice\", \"Bob\"], \"Sales\": [\"Charlie\", \"Dave\"], \"HR\": [\"Eve\"]}</code>",
      "Write a function called <code>transfer_employee</code> that moves an employee from one department to another.",
      "The function accepts the company database dictionary, employee name, current department name, and new department name. It must modify the original dictionary in-place and return nothing.",
      "If the current department does not exist, or the employee is not in that department, the function should do nothing.",
      "<strong>Example:</strong> <code>transfer_employee(company_db, \"Alice\", \"IT\", \"Marketing\")</code> should remove Alice from IT and append Alice to Marketing."
    ],
    starter: blankStarter,
    answer: `def transfer_employee(company_db, employee, current_department, new_department):\n    if current_department not in company_db:\n        return\n    if employee not in company_db[current_department]:\n        return\n    company_db[current_department].remove(employee)\n    company_db.setdefault(new_department, []).append(employee)\n`
  },
  {
    id: "q1b",
    section: "Question 1",
    title: "The Corporate Database",
    part: "Part B: Protected Manipulation",
    topic: "Deep copy and side effects",
    difficulty: "🌶️🌶️🌶️",
    file: "question1_part_b.py",
    description: [
      "This question tests whether you can avoid unwanted side effects when working with nested mutable data.",
      "Write a function called <code>get_restructured_db</code> that simulates a restructuring without altering the original database.",
      "Use the <code>copy</code> library to create a deep duplicate. Remove every department key listed in <code>closed_departments</code> from the duplicate, then return the modified duplicate.",
      "<strong>Example:</strong> If Sales and HR are closed, the returned dictionary should not contain those keys, while the original database remains unchanged."
    ],
    starter: blankStarter,
    answer: `import copy\n\n\ndef get_restructured_db(company_db, closed_departments):\n    new_db = copy.deepcopy(company_db)\n    for department in closed_departments:\n        new_db.pop(department, None)\n    return new_db\n`
  },
  {
    id: "q2a",
    section: "Question 2",
    title: "The Security Checkpoint",
    part: "Part A: Appending Data",
    topic: "File writing",
    difficulty: "🌶️",
    file: "question2_part_a.py",
    description: [
      "Write a function called <code>record_scan</code> that appends a checkpoint log string to the end of a specified text file.",
      "Preserve all existing contents and write the new message exactly as provided, without adding extra formatting, spaces, or newline characters. The function should return nothing."
    ],
    starter: blankStarter,
    answer: `def record_scan(file_path, message):\n    with open(file_path, "a") as file:\n        file.write(message)\n`
  },
  {
    id: "q2b",
    section: "Question 2",
    title: "The Security Checkpoint",
    part: "Part B: Data Filtering",
    topic: "File reading and writing",
    difficulty: "🌶️🌶️",
    file: "question2_part_b.py",
    description: [
      "Write a function called <code>extract_contraband</code> that reads from a source file and writes qualifying lines to a destination file.",
      "Only lines containing the exact uppercase word <code>CONTRABAND</code> qualify. Write each qualifying line with <code>[CONFISCATED]: </code> prepended. The function should return nothing."
    ],
    starter: blankStarter,
    answer: `def extract_contraband(source_path, destination_path):\n    with open(source_path, "r") as source, open(destination_path, "w") as destination:\n        for line in source:\n            if "CONTRABAND" in line:\n                destination.write("[CONFISCATED]: " + line)\n`
  },
  {
    id: "q3a",
    section: "Question 3",
    title: "The Flight Manifest",
    part: "Part A: Pattern Matching",
    topic: "Regular expressions",
    difficulty: "🌶️🌶️",
    file: "question3_part_a.py",
    description: [
      "Write a function called <code>extract_ticket_numbers</code> that accepts a boarding text string.",
      "Using Python's <code>re</code> module, return all valid ticket numbers in discovery order. A valid ticket number is <code>TKT-</code> followed immediately by 4 or more digits."
    ],
    starter: blankStarter,
    answer: `import re\n\n\ndef extract_ticket_numbers(text):\n    return re.findall(r"TKT-\\d{4,}", text)\n`
  },
  {
    id: "q3b",
    section: "Question 3",
    title: "The Flight Manifest",
    part: "Part B: Data Aggregation",
    topic: "Pandas Series",
    difficulty: "🌶️🌶️🌶️",
    file: "question3_part_b.py",
    description: [
      "Write a function called <code>count_ticket_classes</code> that accepts a list of passenger dictionaries.",
      "Use Pandas to convert the list into a DataFrame and return the frequency counts for the <code>ticket_class</code> column as a Pandas Series."
    ],
    starter: blankStarter,
    answer: `import pandas as pd\n\n\ndef count_ticket_classes(passengers):\n    df = pd.DataFrame(passengers)\n    return df["ticket_class"].value_counts()\n`
  },
  {
    id: "q4a",
    section: "Question 4",
    title: "The Power Bank",
    part: "Part A: Class Initialization",
    topic: "Classes and validation",
    difficulty: "🌶️🌶️",
    file: "question4_part_a.py",
    descriptionHtml: `
      <div class="question-markdown">
        <h2>Question 4: The Power Bank</h2>
        <p><strong>Objective:</strong> This question tests your ability to model real-world entities using classes, manage internal state, and implement complex instance methods.</p>
        <h3>Class Structure Definition</h3>
        <p>For this question, you will build a custom object that represents a portable power bank. The object needs to track its own core identity (the brand name) and manage a variable resource (the battery charge level) as it performs actions.</p>
        <h3>Part A: Class Initialization</h3>
        <ol>
          <li>Define a class named <code>PowerBank</code>.</li>
          <li>Create a class variable named <code>MAX_CHARGE</code> set to <code>10000.0</code>.</li>
          <li>The class initialization method (<code>__init__</code>) must accept a string for the power bank's brand name and a floating-point number for the starting charge level.</li>
          <li><strong>Validation Logic:</strong> Validate the charge input before assigning it to an instance attribute named <code>charge_level</code>.
            <ul>
              <li>If negative: default to <code>0.0</code>.</li>
              <li>If greater than <code>MAX_CHARGE</code>: cap it at the maximum allowed value (<code>10000.0</code>).</li>
            </ul>
          </li>
          <li>Store the brand string in an instance attribute named <code>brand_name</code>.</li>
        </ol>
        <h3>Example Output</h3>
        <pre><code>anker = PowerBank("AnkerPro", 12000.0)
print(anker.charge_level)
# Expected Output: 10000.0

generic = PowerBank("NoName", -500.0)
print(generic.charge_level)
# Expected Output: 0.0</code></pre>
      </div>
    `,
    starter: powerBankStarter,
    answer: `class PowerBank:\n    MAX_CHARGE = 10000.0\n\n    def __init__(self, brand_name, charge_level):\n        self.brand_name = brand_name\n        if charge_level < 0:\n            self.charge_level = 0.0\n        elif charge_level > self.MAX_CHARGE:\n            self.charge_level = self.MAX_CHARGE\n        else:\n            self.charge_level = charge_level\n`
  },
  {
    id: "q4b",
    section: "Question 4",
    title: "The Power Bank",
    part: "Part B: Instance Logic",
    topic: "Methods and internal state",
    difficulty: "🌶️🌶️🌶️",
    file: "question4_part_b.py",
    description: [
      "Expand the <code>PowerBank</code> class with an instance method named <code>charge_device</code> that accepts the mAh requested by a connected device.",
      "If enough charge exists, subtract the requested amount and return <code>Device charged using {amount} mAh</code>. If insufficient, deplete the power bank to exactly <code>0.0</code> and return <code>Power bank depleted after {charge_given} mAh</code>."
    ],
    starter: blankStarter,
    answer: `class PowerBank:\n    MAX_CHARGE = 10000.0\n\n    def __init__(self, brand_name, charge_level):\n        self.brand_name = brand_name\n        if charge_level < 0:\n            self.charge_level = 0.0\n        elif charge_level > self.MAX_CHARGE:\n            self.charge_level = self.MAX_CHARGE\n        else:\n            self.charge_level = charge_level\n\n    def charge_device(self, amount):\n        if self.charge_level >= amount:\n            self.charge_level -= amount\n            return f"Device charged using {amount} mAh"\n        charge_given = self.charge_level\n        self.charge_level = 0.0\n        return f"Power bank depleted after {charge_given} mAh"\n`
  },
  {
    id: "q5a",
    section: "Question 5",
    title: "The Score Sheet",
    part: "Part A: Mutability",
    topic: "Transforming a list in-place",
    difficulty: "🌶️🌶️",
    file: "question5_part_a.py",
    description: [
      "Write a function called <code>clamp_scores</code> that accepts a list of numeric scores.",
      "Modify the original list in-place so every score below <code>0</code> becomes <code>0</code>, and every score above <code>100</code> becomes <code>100</code>. Valid scores should stay unchanged.",
      "The function should return nothing."
    ],
    starter: blankStarter,
    answer: `def clamp_scores(scores):\n    for index, score in enumerate(scores):\n        if score < 0:\n            scores[index] = 0\n        elif score > 100:\n            scores[index] = 100\n`
  },
  {
    id: "q5b",
    section: "Question 5",
    title: "The Score Sheet",
    part: "Part B: Queue Transformation",
    topic: "List mutation and return values",
    difficulty: "🌶️🌶️",
    file: "question5_part_b.py",
    description: [
      "Write a function called <code>rotate_queue</code> that accepts a list representing a queue.",
      "Move the first item to the end of the same list and return the moved item. If the queue is empty, return <code>None</code> and leave it unchanged."
    ],
    starter: blankStarter,
    answer: `def rotate_queue(queue):\n    if not queue:\n        return None\n    first = queue.pop(0)\n    queue.append(first)\n    return first\n`
  },
  {
    id: "q6a",
    section: "Question 6",
    title: "The Lab Notes",
    part: "Part A: Numbered Output",
    topic: "File IO",
    difficulty: "🌶️🌶️",
    file: "question6_part_a.py",
    description: [
      "Write a function called <code>write_numbered_lines</code> that reads a source text file and writes a numbered version to a destination file.",
      "Each output line should use the format <code>1: original text</code>, <code>2: original text</code>, and so on. The function should return nothing."
    ],
    starter: blankStarter,
    answer: `def write_numbered_lines(source_path, destination_path):\n    with open(source_path, "r") as source, open(destination_path, "w") as destination:\n        for line_number, line in enumerate(source, start=1):\n            destination.write(f"{line_number}: {line.rstrip()}\\n")\n`
  },
  {
    id: "q6b",
    section: "Question 6",
    title: "The Lab Notes",
    part: "Part B: Config Reader",
    topic: "File parsing",
    difficulty: "🌶️🌶️🌶️",
    file: "question6_part_b.py",
    description: [
      "Write a function called <code>read_config</code> that reads a settings file and returns a dictionary.",
      "Ignore blank lines and lines starting with <code>#</code>. Every remaining line has the format <code>key=value</code>. Strip spaces around keys and values."
    ],
    starter: blankStarter,
    answer: `def read_config(path):\n    settings = {}\n    with open(path, "r") as file:\n        for line in file:\n            line = line.strip()\n            if not line or line.startswith("#"):\n                continue\n            key, value = line.split("=", 1)\n            settings[key.strip()] = value.strip()\n    return settings\n`
  },
  {
    id: "q7a",
    section: "Question 7",
    title: "The Geometry Module",
    part: "Part A: Importing Math",
    topic: "Modules and libraries",
    difficulty: "🌶️",
    file: "question7_part_a.py",
    description: [
      "Write a function called <code>calculate_circle_areas</code> that accepts a list of radii.",
      "Use Python's <code>math</code> module and return a new list containing each circle area, calculated as <code>math.pi * radius * radius</code>."
    ],
    starter: blankStarter,
    answer: `import math\n\n\ndef calculate_circle_areas(radii):\n    return [math.pi * radius * radius for radius in radii]\n`
  },
  {
    id: "q7b",
    section: "Question 7",
    title: "The Geometry Module",
    part: "Part B: Sorting Records",
    topic: "Libraries and structured data",
    difficulty: "🌶️🌶️",
    file: "question7_part_b.py",
    description: [
      "Write a function called <code>choose_top_students</code> that accepts a list of student dictionaries and a number <code>n</code>.",
      "Each dictionary has <code>name</code> and <code>score</code>. Return the names of the top <code>n</code> students sorted by highest score first. If scores tie, sort by name alphabetically."
    ],
    starter: blankStarter,
    answer: `def choose_top_students(records, n):\n    sorted_records = sorted(records, key=lambda record: (-record["score"], record["name"]))\n    return [record["name"] for record in sorted_records[:n]]\n`
  },
  {
    id: "q8a",
    section: "Question 8",
    title: "The Library Book",
    part: "Part A: Classes and Instances",
    topic: "OOP initialization and methods",
    difficulty: "🌶️🌶️",
    file: "question8_part_a.py",
    description: [
      "Define a class named <code>LibraryBook</code>. The initializer should accept <code>title</code> and <code>author</code> and store them as instance attributes.",
      "Every new book should start with <code>is_borrowed</code> set to <code>False</code>. Add a <code>borrow</code> method that returns <code>True</code> and marks the book as borrowed if available, otherwise returns <code>False</code>."
    ],
    starter: blankStarter,
    answer: `class LibraryBook:\n    def __init__(self, title, author):\n        self.title = title\n        self.author = author\n        self.is_borrowed = False\n\n    def borrow(self):\n        if self.is_borrowed:\n            return False\n        self.is_borrowed = True\n        return True\n`
  },
  {
    id: "q8b",
    section: "Question 8",
    title: "The Library Book",
    part: "Part B: Instance State",
    topic: "OOP state changes",
    difficulty: "🌶️🌶️🌶️",
    file: "question8_part_b.py",
    description: [
      "Expand the <code>LibraryBook</code> class with a <code>return_book</code> method.",
      "If the book is currently borrowed, mark it as available and return <code>True</code>. If it is already available, return <code>False</code>."
    ],
    starter: blankStarter,
    answer: `class LibraryBook:\n    def __init__(self, title, author):\n        self.title = title\n        self.author = author\n        self.is_borrowed = False\n\n    def borrow(self):\n        if self.is_borrowed:\n            return False\n        self.is_borrowed = True\n        return True\n\n    def return_book(self):\n        if not self.is_borrowed:\n            return False\n        self.is_borrowed = False\n        return True\n`
  }
];

const structuredDescriptions = {
  q1a: `
    <div class="question-markdown">
      <h2>Question 1: The Corporate Database</h2>
      <p><strong>Objective:</strong> This question tests your understanding of mutability, nested data structures, and in-place modification.</p>
      <h3>Data Structure Definition</h3>
      <p>You will work with a company database. It is a dictionary where each key is a department name and each value is a list of employee names in that department.</p>
      <pre><code>company_db = {
    "Engineering": ["Alice", "Bob"],
    "Sales": ["Charlie", "Dave"],
    "HR": ["Eve"]
}</code></pre>
      <h3>Part A: In-Place Modification</h3>
      <ol>
        <li>Write a function called <code>transfer_employee</code>.</li>
        <li>The function must accept <code>company_db</code>, <code>employee</code>, <code>current_department</code>, and <code>new_department</code>.</li>
        <li>Find the employee in the current department list.</li>
        <li>Remove the employee from the current department and append them to the new department.</li>
        <li>If the current department does not exist, or the employee is not there, do nothing.</li>
        <li>Modify the original dictionary in-place and return nothing.</li>
      </ol>
      <h3>Example Output</h3>
      <pre><code>company_db = {"IT": ["Alice", "Bob"], "Marketing": ["Charlie"]}
transfer_employee(company_db, "Alice", "IT", "Marketing")
print(company_db)
# Expected Output: {'IT': ['Bob'], 'Marketing': ['Charlie', 'Alice']}</code></pre>
    </div>
  `,
  q1b: `
    <div class="question-markdown">
      <h2>Question 1: The Corporate Database</h2>
      <p><strong>Objective:</strong> This question tests whether you can protect an original mutable object from unwanted side effects.</p>
      <h3>Data Structure Definition</h3>
      <p>The company database is a nested dictionary containing department names mapped to employee-name lists.</p>
      <h3>Part B: Protected Manipulation</h3>
      <ol>
        <li>Write a function called <code>get_restructured_db</code>.</li>
        <li>The function must accept the database and a list of department names to close.</li>
        <li>Use the <code>copy</code> module to create a deep duplicate of the database.</li>
        <li>Remove closed departments from the duplicate only.</li>
        <li>Return the modified duplicate and leave the original database unchanged.</li>
      </ol>
      <h3>Example Output</h3>
      <pre><code>company_db = {"IT": ["Alice"], "Sales": ["Bob"], "HR": ["Charlie"]}
result = get_restructured_db(company_db, ["Sales", "HR"])
print(result)
# Expected Output: {'IT': ['Alice']}
print(company_db)
# Original database remains unchanged</code></pre>
    </div>
  `,
  q2a: `
    <div class="question-markdown">
      <h2>Question 2: The Security Checkpoint</h2>
      <p><strong>Objective:</strong> This question evaluates safe file writing and correct use of append mode.</p>
      <h3>File Structure Definition</h3>
      <p>You will interact with an external text file that stores checkpoint log messages.</p>
      <h3>Part A: Appending Data</h3>
      <ol>
        <li>Write a function called <code>record_scan</code>.</li>
        <li>The function must accept a file path and a message string.</li>
        <li>Append the message to the end of the file.</li>
        <li>Do not add extra spaces, formatting, or newline characters.</li>
        <li>Close the file safely and return nothing.</li>
      </ol>
      <h3>Example Output</h3>
      <pre><code>record_scan("scans.log", "Passenger cleared.")
record_scan("scans.log", " ID verified.")

# Output in scans.log:
# Passenger cleared. ID verified.</code></pre>
    </div>
  `,
  q2b: `
    <div class="question-markdown">
      <h2>Question 2: The Security Checkpoint</h2>
      <p><strong>Objective:</strong> This question tests file reading, filtering text data, and writing selected results to a new file.</p>
      <h3>File Structure Definition</h3>
      <p>The source file contains multiple checkpoint lines. Only lines containing the exact uppercase word <code>CONTRABAND</code> should be extracted.</p>
      <h3>Part B: Data Filtering</h3>
      <ol>
        <li>Write a function called <code>extract_contraband</code>.</li>
        <li>The function must accept a source path and destination path.</li>
        <li>Read the source file line by line.</li>
        <li>Write qualifying lines to the destination file.</li>
        <li>Prepend <code>[CONFISCATED]: </code> to each written line.</li>
        <li>Return nothing.</li>
      </ol>
      <h3>Example Output</h3>
      <pre><code># Source line:
# CONTRABAND: Prohibited liquid detected

extract_contraband("scans.log", "seized_items.txt")

# Output line:
# [CONFISCATED]: CONTRABAND: Prohibited liquid detected</code></pre>
    </div>
  `,
  q3a: `
    <div class="question-markdown">
      <h2>Question 3: The Flight Manifest</h2>
      <p><strong>Objective:</strong> This question tests your ability to use an imported module to extract structured patterns from unstructured text.</p>
      <h3>Data Processing Definition</h3>
      <p>A valid ticket number starts with <code>TKT-</code> followed immediately by 4 or more digits.</p>
      <h3>Part A: Pattern Matching</h3>
      <ol>
        <li>Write a function called <code>extract_ticket_numbers</code>.</li>
        <li>The function must accept one string argument.</li>
        <li>Use the Python <code>re</code> module.</li>
        <li>Return a list of all valid ticket numbers.</li>
        <li>Preserve the exact order in which the tickets appear.</li>
      </ol>
      <h3>Example Output</h3>
      <pre><code>text = "Passengers hold TKT-4412, TKT-99, and TKT-100200."
result = extract_ticket_numbers(text)
print(result)
# Expected Output: ['TKT-4412', 'TKT-100200']</code></pre>
    </div>
  `,
  q3b: `
    <div class="question-markdown">
      <h2>Question 3: The Flight Manifest</h2>
      <p><strong>Objective:</strong> This question tests basic use of a Python library to convert structured data and aggregate values.</p>
      <h3>Data Processing Definition</h3>
      <p>You will receive a list of passenger dictionaries. Each dictionary includes a <code>ticket_class</code> key.</p>
      <h3>Part B: Data Aggregation</h3>
      <ol>
        <li>Write a function called <code>count_ticket_classes</code>.</li>
        <li>Convert the passenger list into a Pandas DataFrame.</li>
        <li>Count the frequency of each unique value in the <code>ticket_class</code> column.</li>
        <li>Return the result as a Pandas Series.</li>
      </ol>
      <h3>Example Output</h3>
      <pre><code>passengers = [
    {"ticket_class": "Economy", "name": "Alice"},
    {"ticket_class": "Business", "name": "Bob"},
    {"ticket_class": "Economy", "name": "Charlie"}
]
print(count_ticket_classes(passengers))
# Economy     2
# Business    1</code></pre>
    </div>
  `,
  q4b: `
    <div class="question-markdown">
      <h2>Question 4: The Power Bank</h2>
      <p><strong>Objective:</strong> This question tests instance methods, internal state updates, and conditional logic inside a class.</p>
      <h3>Class Structure Definition</h3>
      <p>Continue using the <code>PowerBank</code> class. The object must remember its brand and current charge level while methods change that state.</p>
      <h3>Part B: Instance Logic</h3>
      <ol>
        <li>Add an instance method called <code>charge_device</code>.</li>
        <li>The method must accept a floating-point value representing requested mAh.</li>
        <li>If enough charge exists, subtract the full requested amount.</li>
        <li>Return <code>Device charged using {amount} mAh</code>.</li>
        <li>If charge is insufficient, transfer only the remaining charge, set <code>charge_level</code> to <code>0.0</code>, and return <code>Power bank depleted after {charge_given} mAh</code>.</li>
      </ol>
      <h3>Example Output</h3>
      <pre><code>my_bank = PowerBank("ChargeMax", 2000.0)
print(my_bank.charge_device(1500.0))
# Expected Output: Device charged using 1500.0 mAh
print(my_bank.charge_level)
# Expected Output: 500.0</code></pre>
    </div>
  `,
  q5a: `
    <div class="question-markdown">
      <h2>Question 5: The Score Sheet</h2>
      <p><strong>Objective:</strong> This question tests in-place transformation of a mutable sequence.</p>
      <h3>Sequence Definition</h3>
      <p>You will receive a list of numeric scores that may contain invalid values below <code>0</code> or above <code>100</code>.</p>
      <h3>Part A: Mutability</h3>
      <ol>
        <li>Write a function called <code>clamp_scores</code>.</li>
        <li>Modify the original list directly.</li>
        <li>Replace values below <code>0</code> with <code>0</code>.</li>
        <li>Replace values above <code>100</code> with <code>100</code>.</li>
        <li>Return nothing.</li>
      </ol>
      <h3>Example Output</h3>
      <pre><code>scores = [88, -4, 105, 72]
clamp_scores(scores)
print(scores)
# Expected Output: [88, 0, 100, 72]</code></pre>
    </div>
  `,
  q5b: `
    <div class="question-markdown">
      <h2>Question 5: The Score Sheet</h2>
      <p><strong>Objective:</strong> This question tests list mutation and combining mutation with a return value.</p>
      <h3>Sequence Definition</h3>
      <p>A queue is represented as a list. The first item is at index <code>0</code>.</p>
      <h3>Part B: Queue Transformation</h3>
      <ol>
        <li>Write a function called <code>rotate_queue</code>.</li>
        <li>Remove the first item from the queue.</li>
        <li>Append that item to the end of the same list.</li>
        <li>Return the moved item.</li>
        <li>If the list is empty, return <code>None</code> and leave it unchanged.</li>
      </ol>
      <h3>Example Output</h3>
      <pre><code>queue = ["Alice", "Bob", "Charlie"]
print(rotate_queue(queue))
# Expected Output: Alice
print(queue)
# Expected Output: ['Bob', 'Charlie', 'Alice']</code></pre>
    </div>
  `,
  q6a: `
    <div class="question-markdown">
      <h2>Question 6: The Lab Notes</h2>
      <p><strong>Objective:</strong> This question tests reading from one file and writing transformed content to another file.</p>
      <h3>File Structure Definition</h3>
      <p>The source file contains plain text lines. The destination file should contain numbered versions of those lines.</p>
      <h3>Part A: Numbered Output</h3>
      <ol>
        <li>Write a function called <code>write_numbered_lines</code>.</li>
        <li>Accept a source file path and destination file path.</li>
        <li>Read each source line in order.</li>
        <li>Write each line using the format <code>1: text</code>, <code>2: text</code>, and so on.</li>
        <li>Return nothing.</li>
      </ol>
      <h3>Example Output</h3>
      <pre><code># notes.txt contains:
# alpha
# beta

write_numbered_lines("notes.txt", "numbered.txt")

# numbered.txt contains:
# 1: alpha
# 2: beta</code></pre>
    </div>
  `,
  q6b: `
    <div class="question-markdown">
      <h2>Question 6: The Lab Notes</h2>
      <p><strong>Objective:</strong> This question tests file parsing and building a dictionary from text data.</p>
      <h3>File Structure Definition</h3>
      <p>The settings file contains lines in <code>key=value</code> format. Blank lines and comment lines beginning with <code>#</code> should be ignored.</p>
      <h3>Part B: Config Reader</h3>
      <ol>
        <li>Write a function called <code>read_config</code>.</li>
        <li>Accept one file path.</li>
        <li>Ignore blank lines and comments.</li>
        <li>Split valid lines at the first <code>=</code>.</li>
        <li>Strip surrounding spaces from keys and values.</li>
        <li>Return a dictionary.</li>
      </ol>
      <h3>Example Output</h3>
      <pre><code># settings.txt contains:
# theme = dark
# retries=3

print(read_config("settings.txt"))
# Expected Output: {'theme': 'dark', 'retries': '3'}</code></pre>
    </div>
  `,
  q7a: `
    <div class="question-markdown">
      <h2>Question 7: The Geometry Module</h2>
      <p><strong>Objective:</strong> This question tests importing and using a standard Python module.</p>
      <h3>Module Definition</h3>
      <p>Use the <code>math</code> module to access <code>math.pi</code> for accurate circle area calculations.</p>
      <h3>Part A: Importing Math</h3>
      <ol>
        <li>Write a function called <code>calculate_circle_areas</code>.</li>
        <li>Accept a list of radii.</li>
        <li>Calculate each area using <code>math.pi * radius * radius</code>.</li>
        <li>Return a new list of areas.</li>
      </ol>
      <h3>Example Output</h3>
      <pre><code>print(calculate_circle_areas([1, 2]))
# Expected Output: [3.141592653589793, 12.566370614359172]</code></pre>
    </div>
  `,
  q7b: `
    <div class="question-markdown">
      <h2>Question 7: The Geometry Module</h2>
      <p><strong>Objective:</strong> This question tests sorting structured data using Python functions.</p>
      <h3>Data Structure Definition</h3>
      <p>You will receive a list of dictionaries. Each dictionary contains a student's <code>name</code> and <code>score</code>.</p>
      <h3>Part B: Sorting Records</h3>
      <ol>
        <li>Write a function called <code>choose_top_students</code>.</li>
        <li>Accept the student records and a number <code>n</code>.</li>
        <li>Sort by highest score first.</li>
        <li>If scores tie, sort by name alphabetically.</li>
        <li>Return only the names of the top <code>n</code> students.</li>
      </ol>
      <h3>Example Output</h3>
      <pre><code>records = [
    {"name": "Mina", "score": 81},
    {"name": "Alex", "score": 95},
    {"name": "Zoe", "score": 95}
]
print(choose_top_students(records, 2))
# Expected Output: ['Alex', 'Zoe']</code></pre>
    </div>
  `,
  q8a: `
    <div class="question-markdown">
      <h2>Question 8: The Library Book</h2>
      <p><strong>Objective:</strong> This question tests class creation, instance attributes, and a simple instance method.</p>
      <h3>Class Structure Definition</h3>
      <p>You will build a class that represents a library book and tracks whether it has been borrowed.</p>
      <h3>Part A: Classes and Instances</h3>
      <ol>
        <li>Define a class named <code>LibraryBook</code>.</li>
        <li>The initializer must accept <code>title</code> and <code>author</code>.</li>
        <li>Store both values as instance attributes.</li>
        <li>Set <code>is_borrowed</code> to <code>False</code> for every new book.</li>
        <li>Add a <code>borrow</code> method that returns <code>True</code> when borrowing succeeds.</li>
        <li>If the book is already borrowed, <code>borrow</code> should return <code>False</code>.</li>
      </ol>
      <h3>Example Output</h3>
      <pre><code>book = LibraryBook("Python Basics", "Dr Lee")
print(book.borrow())
# Expected Output: True
print(book.borrow())
# Expected Output: False</code></pre>
    </div>
  `,
  q8b: `
    <div class="question-markdown">
      <h2>Question 8: The Library Book</h2>
      <p><strong>Objective:</strong> This question tests updating and checking instance state through multiple methods.</p>
      <h3>Class Structure Definition</h3>
      <p>Continue using the <code>LibraryBook</code> class. The object must track whether it is currently borrowed.</p>
      <h3>Part B: Instance State</h3>
      <ol>
        <li>Add a method called <code>return_book</code>.</li>
        <li>If the book is currently borrowed, mark it as available and return <code>True</code>.</li>
        <li>If the book is already available, return <code>False</code>.</li>
        <li>The <code>borrow</code> method from Part A should still work.</li>
      </ol>
      <h3>Example Output</h3>
      <pre><code>book = LibraryBook("Clean Code", "Robert Martin")
print(book.return_book())
# Expected Output: False
book.borrow()
print(book.return_book())
# Expected Output: True</code></pre>
    </div>
  `
};

function applyQuestionBankUpdate() {
  if (localStorage.getItem("questionBankVersion") === APP_VERSION) {
    return;
  }

  const savedCode = {};
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("code:")) {
      savedCode[key] = localStorage.getItem(key);
      localStorage.removeItem(key);
    }
  });
  localStorage.setItem("previousCodeBackup", JSON.stringify(savedCode));
  localStorage.setItem("questionBankVersion", APP_VERSION);
}

applyQuestionBankUpdate();

let current = 0;
let mode = "instructions";
let remainingSeconds = 60 * 60;
let timerId = null;
const passed = new Set(JSON.parse(localStorage.getItem("passedQuestions") || "[]"));

const list = document.querySelector("#questionList");
const doneCount = document.querySelector("#doneCount");
const totalCount = document.querySelector("#totalCount");
const sectionLabel = document.querySelector("#sectionLabel");
const questionTitle = document.querySelector("#questionTitle");
const partTitle = document.querySelector("#partTitle");
const description = document.querySelector("#description");
const answerBlock = document.querySelector("#answerBlock");
const fileName = document.querySelector("#fileName");
const codeEditor = document.querySelector("#codeEditor");
const result = document.querySelector("#result");
const instructionsView = document.querySelector("#instructionsView");
const practiceView = document.querySelector("#practiceView");
const instructionsTab = document.querySelector("#instructionsTab");
const practiceTab = document.querySelector("#practiceTab");
const timerDisplay = document.querySelector("#timerDisplay");
const timerBtn = document.querySelector("#timerBtn");
const resetBtn = document.querySelector("#resetBtn");
const runBtn = document.querySelector("#runBtn");
const executeBtn = document.querySelector("#executeBtn");

function saveCode(id, code) {
  localStorage.setItem(`code:${id}`, code);
}

function loadCode(question) {
  return localStorage.getItem(`code:${question.id}`) || question.starter;
}

function renderList() {
  list.innerHTML = "";
  questions.forEach((q, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `question-item${index === current ? " active" : ""}${passed.has(q.id) ? " done" : ""}`;
    button.textContent = `${q.section} · ${q.part.replace("Part ", "")}`;
    button.addEventListener("click", () => selectQuestion(index));
    list.appendChild(button);
  });
  doneCount.textContent = passed.size;
  totalCount.textContent = questions.length;
}

function setMode(nextMode) {
  mode = nextMode;
  const showingInstructions = mode === "instructions";
  document.body.classList.toggle("practice-mode", !showingInstructions);
  instructionsView.hidden = !showingInstructions;
  practiceView.hidden = showingInstructions;
  instructionsTab.classList.toggle("active", showingInstructions);
  practiceTab.classList.toggle("active", !showingInstructions);
  resetBtn.hidden = showingInstructions;
  runBtn.hidden = showingInstructions;
  executeBtn.hidden = showingInstructions;

  if (showingInstructions) {
    sectionLabel.textContent = "Test instructions";
    questionTitle.textContent = "In-class Test 2";
  } else {
    const q = questions[current];
    sectionLabel.textContent = q.section;
    questionTitle.textContent = q.title;
  }
}

function selectQuestion(index) {
  saveCode(questions[current].id, codeEditor.value);
  current = index;
  const q = questions[current];
  sectionLabel.textContent = q.section;
  questionTitle.textContent = q.title;
  partTitle.textContent = q.part;
  description.innerHTML = renderDescription(q);
  answerBlock.textContent = q.answer;
  fileName.textContent = q.file;
  codeEditor.value = loadCode(q);
  result.className = "result idle";
  result.textContent = `$ python3 ${q.file}\nReady. Click Run Code for print output, or Run Tests for hidden tests.`;
  setMode("practice");
  renderList();
}

function renderDescription(question) {
  if (question.descriptionHtml) {
    return question.descriptionHtml;
  }

  if (structuredDescriptions[question.id]) {
    return structuredDescriptions[question.id];
  }

  return `<div class="question-markdown"><h2>${question.title}</h2><h3>${question.part}</h3>${question.description.map((line) => `<p>${line}</p>`).join("")}</div>`;
}

function renderTimer() {
  const minutes = Math.floor(remainingSeconds / 60).toString().padStart(2, "0");
  const seconds = (remainingSeconds % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function toggleTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
    timerBtn.textContent = "继续计时";
    return;
  }

  timerBtn.textContent = "暂停计时";
  timerId = setInterval(() => {
    remainingSeconds -= 1;
    renderTimer();
    if (remainingSeconds <= 0) {
      clearInterval(timerId);
      timerId = null;
      remainingSeconds = 0;
      timerBtn.textContent = "重新开始";
      result.className = "result fail";
      result.textContent = "60 分钟模拟时间已结束。";
    }
  }, 1000);
}

async function runTests() {
  const q = questions[current];
  saveCode(q.id, codeEditor.value);
  result.className = "result idle";
  result.textContent = `$ python3 ${q.file}\nRunning hidden tests...`;

  try {
    const response = await fetch("/api/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId: q.id, code: codeEditor.value })
    });
    const data = await response.json();
    result.className = `result ${data.ok ? "ok" : "fail"}`;
    result.textContent = data.ok
      ? `$ python3 ${q.file}\nPASS: All hidden tests passed.`
      : `$ python3 ${q.file}\nFAIL:\n${data.output}`;
    if (data.ok) {
      passed.add(q.id);
      localStorage.setItem("passedQuestions", JSON.stringify([...passed]));
      renderList();
    }
  } catch (error) {
    result.className = "result fail";
    result.textContent = "$ python3 server.py\n无法连接本地判题服务。请确认 server.py 正在运行。";
  }
}

async function executeCode() {
  const q = questions[current];
  saveCode(q.id, codeEditor.value);
  result.className = "result idle";
  result.textContent = `$ python3 ${q.file}\nRunning code...`;

  try {
    const response = await fetch("/api/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: codeEditor.value })
    });
    const data = await response.json();
    result.className = `result ${data.ok ? "idle" : "fail"}`;
    result.textContent = `$ python3 ${q.file}\n${data.output}`;
  } catch (error) {
    result.className = "result fail";
    result.textContent = "$ python3 server.py\n无法连接本地终端服务。请确认 server.py 正在运行。";
  }
}

codeEditor.addEventListener("input", () => saveCode(questions[current].id, codeEditor.value));
runBtn.addEventListener("click", runTests);
executeBtn.addEventListener("click", executeCode);
resetBtn.addEventListener("click", () => {
  const q = questions[current];
  codeEditor.value = q.starter;
  saveCode(q.id, q.starter);
});
instructionsTab.addEventListener("click", () => setMode("instructions"));
practiceTab.addEventListener("click", () => setMode("practice"));
timerBtn.addEventListener("click", () => {
  if (remainingSeconds === 0) {
    remainingSeconds = 60 * 60;
    renderTimer();
  }
  toggleTimer();
});

codeEditor.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    const start = codeEditor.selectionStart;
    const end = codeEditor.selectionEnd;
    codeEditor.value = `${codeEditor.value.slice(0, start)}    ${codeEditor.value.slice(end)}`;
    codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
    saveCode(questions[current].id, codeEditor.value);
  }
});

selectQuestion(0);
setMode("practice");
renderTimer();
