# Lunar Calendar Algorithm (LichTa Algorithm)

> 🇻🇳 [Phiên bản Tiếng Việt (Vietnamese version)](./ALGORITHM.vi.md)

The `lichta` library uses the Vietnamese Lunar Calendar calculation algorithm developed by **Dr. Ho Ngoc Duc** (Leipzig University). This algorithm is based on precise astronomical formulas from the book *Astronomical Algorithms* by **Jean Meeus**.

## 1. Astronomical Basis

The lunar calendar is not a random sequence of days but is strictly calculated based on the relative positions of the Sun, Moon, and Earth.

### New Moon (Điểm Sóc)
The New Moon is the moment when the longitude of the Moon and the longitude of the Sun are equal (the Moon is exactly between the Earth and the Sun).
- **Rule for the 1st day**: The starting day of a lunar month (the 1st) is always the day containing the **New Moon**.
- Because the calculation timezone for Vietnam is **UTC+7** (while China is UTC+8), there are times when the New Moon falls before 24:00 in Vietnam (meaning it is already a new day in China). This causes the 1st day of the Vietnamese lunar month to occasionally differ by 1 day from the Chinese lunar month.

### Solar Terms (Tiết Khí & Trung Khí)
The Earth's orbit around the Sun is divided into 24 equal parts, called 24 Solar Terms. Among them, the 12 points with even sun longitudes (0°, 30°, 60°, etc.) are called **Principal Terms (Trung Khí)**, and the remaining 12 points are called **Sectional Terms (Tiết Khí)**.
- A normal lunar year has 12 months, each usually containing at least one Principal Term.
- The **Winter Solstice (Đông Chí)** always falls in the 11th lunar month.

## 2. Leap Month Rules

To synchronize the Moon's cycle (Lunar calendar) with the Earth's orbit (Solar calendar), the lunar calendar needs to insert leap months.
- **Leap Year**: If the period between two consecutive Winter Solstices contains 13 lunar months (instead of 12), then that year is a lunar leap year.
- **Determining the leap month**: The first month in that leap year that **does not contain any Principal Term (Trung Khí)** will be taken as the leap month.

## 3. The Role of Julian Day Number (JDN)

To easily add, subtract, and calculate the distance between days, the algorithm does not directly use day/month/year but converts all time markers to **Julian Day Number (JDN)**.
- JDN is the total number of days elapsed since 12:00 noon on January 1, 4713 BC.
- JDN provides a continuous linear time axis, ideal for applying complex trigonometric formulas in astronomy (calculating celestial longitude and latitude).

## 4. Characteristics of the LichTa Library

- **Calculation Range**: From 1800 to 2199 (400 years). Within this period, astronomical constants ensure extremely high accuracy for the positions of celestial bodies.
- **Flexibility**: The library allows passing an optional timezone offset. The default is UTC+7 for Vietnam. You can pass `8` to calculate the lunar calendar for China, or `9` for Japan.

## 5. References
- [Vietnamese Lunar Calendar - Dr. Ho Ngoc Duc](http://www.informatik.uni-leipzig.de/~duc/amlich/)
- *Astronomical Algorithms* - Jean Meeus (1998)
