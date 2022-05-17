module.exports = {
	content: ["./src/**/*.{js,jsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#432d27",
				secondary: "#ab6d3a",
				accent: "#f0ecea",
			},
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
