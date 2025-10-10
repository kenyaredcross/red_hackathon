# Copyright (c) 2025, Kelvin Njenga and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class HackathonApplication(Document):
	def validate(self):
		total_score = 0
		total_rows = len(self.scores_round_one or [])

		if total_rows:
			for row in self.scores_round_one:
				total_score += row.score

			
		self.round_one_total_score = total_score
