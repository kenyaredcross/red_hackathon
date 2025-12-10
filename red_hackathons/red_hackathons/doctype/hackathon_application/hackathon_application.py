# Copyright (c) 2025, Kelvin Njenga and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class HackathonApplication(Document):
	def validate(self):
		self.calc_round_two()
		self.calc_round_three()
		

	def calc_round_two(self):
		total_score = 0
		total_rows = len(self.scores_round_one or [])

		if total_rows:
			for row in self.scores_round_one:
				total_score += row.score

			
		self.round_one_total_score = total_score
	
	def calc_round_three(self):
		total_score = 0
		total_rows = len(self.scores_round_three or [])

		if total_rows:
			for row in self.scores_round_three:
				total_score += row.score

			
		self.score_3 = total_score
