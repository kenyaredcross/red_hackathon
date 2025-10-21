// Copyright (c) 2025, Kelvin Njenga and contributors
// For license information, please see license.txt


frappe.ui.form.on("Hackathon Application", {
    refresh(frm) {
        calc_total_score(frm);
    },
    validate: function(frm, cdt,cdn) {
        calc_total_score(frm);
        
    },
    onload(frm) {
        if (frm.is_new) {
            frm.add_custom_button ('Click Me', () => frappe.msgprint("Button Has been Clicked"));
        }

    }
    

});

frappe.ui.form.on("Hackathon Round Entry", {
    score(frm, cdt, cdn){
        calc_total_score(frm);
        run_validations(frm, cdt, cdn);

        
    }
});



function calc_total_score(frm) {
    let total_score = 0;
    // Round ONE

    // Round TWO
    (frm.doc.round_two || []).forEach(row => {
        total_score += row.score || 0;
    });
    frm.set_value('score_2', total_score);
};

function run_validations(frm, cdt, cdn) {
    // Check weight of score

    let row = locals[cdt][cdn];

    frappe.db.get_value("Hackathon Selection Criteria", row.criteria, "weight")
    .then( r=> {
        if (!r || !r.message) {
            return;
        }

        let weight = r.message.weight;
        let score = row.score;

        if (score > weight) {
            frappe.msgprint({
                title: __("Invalid Score"),
                message: __("The weight for this criteria is between 0 and {0}", [weight]), 
                indicator: "red"
            });

            frappe.model.set_value(cdt, cdn, "score", "");
        }
        
    })

    


};



