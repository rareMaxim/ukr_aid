// Copyright (c) 2024, rareMax and contributors
// For license information, please see license.txt
function updateBirthDayAndGenre(frm) {
    if (!frm.doc.codetax || (frm.doc.codetax.length != 10)) { return };
    frappe.require('/assets/frappe_ua/js/rnokpp.js', () => {
        data = rnokppInfo(frm.doc.codetax); //|| frm.doc.sex
        data.gender = data.gender == "Male" ? "Чоловік" : "Жінка";
        data.birthday = frappe.format(data.birthday, { fieldtype: 'Date' });

        if (frm.doc.birth_day && (frappe.format(frm.doc.birth_day, { fieldtype: 'Date' }) != data.birthday)) {
            frappe.show_alert({
                message: "Дата народження не відповідає РНОКПП",
                indicator: 'orange'
            }, 5);
        } else if (!frm.doc.birth_day) {
            frm.set_value('birth_day', data.birthday);
        };
        if (frm.doc.sex && (frm.doc.sex != data.gender)) {
            frappe.show_alert({
                message: 'Стать не відповідає РНОКПП',
                indicator: 'orange'
            }, 5);
            return
        } else if (!frm.doc.sex) {
            if (data.gender == "Male")
                frm.set_value('sex', data.gender == "Male" ? "Чоловік" : "Жінка");
        };
    })
};
frappe.ui.form.on("AID Customer", {
    refresh(frm) {
        updateBirthDayAndGenre(frm);
    },
    codetax(frm) {
        updateBirthDayAndGenre(frm);
    }
});
