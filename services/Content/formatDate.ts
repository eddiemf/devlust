export const formatDate = (date: string) => {
	try {
		const day = date.split('-')[2];
		const monthNumber = +date.split('-')[1];
		const yearNumber = +date.split('-')[0];

		const monthsMap = new Map<number, string>();

		monthsMap.set(1, 'January');
		monthsMap.set(2, 'February');
		monthsMap.set(3, 'March');
		monthsMap.set(4, 'April');
		monthsMap.set(5, 'May');
		monthsMap.set(6, 'June');
		monthsMap.set(7, 'July');
		monthsMap.set(8, 'August');
		monthsMap.set(9, 'September');
		monthsMap.set(10, 'October');
		monthsMap.set(11, 'November');
		monthsMap.set(12, 'December');

		if (!monthsMap.has(monthNumber)) throw new Error();

		const formattedDay = day.padStart(2, '0');
		const formattedMonth = monthsMap.get(monthNumber);
		const formattedDate = `${formattedMonth} ${formattedDay}, ${yearNumber}`;

		return formattedDate;
	} catch (error) {
		console.log(`Error formatting date ${date}.`);
		return '';
	}
};
