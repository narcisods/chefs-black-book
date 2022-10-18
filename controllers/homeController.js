/**
 * Get /
 * Homepage
 */
module.exports = {
	homepage: async (req, res) => {
		try {
			res.render('index');
		} catch (err) {
			console.log(err);
		}
	},
	getContact: async (req, res) => {
		try {
			res.render('contact.ejs', { title: `Chef's Black Book - Contact` });
		} catch (err) {
			console.log(err);
		}
	},
	getAbout: async (req, res) => {
		try {
			res.render('about.ejs', { title: `Chef's Black Book - About` });
		} catch (err) {
			console.log(err);
		}
	},
};
