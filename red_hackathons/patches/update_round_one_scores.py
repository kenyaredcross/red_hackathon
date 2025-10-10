import frappe

def execute():
    applications = frappe.get_all("Hackathon Application", fields=["name"])

    for app in applications:
        doc = frappe.get_doc("Hackathon Application", app.name)
        total_score = 0
        total_rows = len(doc.scores_round_one or [])

        if total_rows:
            for row in doc.scores_round_one:
                total_score += (row.score or 0)

        doc.round_one_total_score = total_score
        doc.db_update()

    frappe.db.commit()
