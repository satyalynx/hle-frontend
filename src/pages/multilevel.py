
#Real life example for mulilevel inheritance

class Person:
	def personality(self):
		print("All the personalities.")

class Student(Person):
	def subjects(self):
		print("All the subjects.")

class EngStudents(Student):
	def specificSub(self):
		print("Mathematics.")

ob = EngStudents()
ob.personality()
ob.subjects()
ob.specificSub()
