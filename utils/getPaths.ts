// import glob from "glob";

export default (locale, processId: (id: string) => string, path: string) => {
	//get all .md files in the posts dir
	// const blogs = glob.sync(path, {
	// 	stat: true,
	// });

	//remove path and extension to leave filename only
	// const blogSlugs = blogs.map((file) =>
	// 	file.split("/")[2].replace(/ /g, "-").slice(0, -3).trim()
	// );
	// create paths with `slug` param
	// const paths = blogSlugs.map(slug => `/blog/${encodeURI(slug)}`)

	const appData = require("../data/i18n/" + locale + "/appData.ts");

	const paths = appData
		.filter((app) => app.comp)
		.map((slug) => {
			return {
				params: {
					id: slug.link,
				},
				locale,
			};
		});

	// console.log(paths)

	return paths;
};
