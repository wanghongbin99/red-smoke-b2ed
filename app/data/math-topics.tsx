export const mathTopicsData = [
  {
    "id": "whole-numbers",
    "title": "Whole Numbers",
    "explanation": "Whole numbers include the four operations (addition, subtraction, multiplication, division), order of operations (BODMAS), factors, multiples, and rounding off to the nearest 10, 100, or 1000. Pay special attention to word problems involving grouping, remainder, and the 6 common models: Comparison, Simultaneous, Systematic Listing, Excess & Shortage, Assumption, and Grouping.",
    "questions": [
      {
        "question": (
          <div className="space-y-4">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">Type 1: Comparison Model</span>
            <p>Andrew, Pat, and Bernard shared a total of 221 toy cars. Andrew received 25 toy cars fewer than Pat and 35 toy cars more than Bernard. How many toy cars did Bernard receive?</p>
            <img src="https://static.wixstatic.com/media/cb578d_67ce65d852504b6f88c4fccce5d20466~mv2.png" alt="Comparison Model" className="w-full max-w-sm rounded-lg border border-gray-200 mt-2" />
          </div>
        ),
        "options": ["42", "77", "102", "35"],
        "answer": "42",
        "explanation": "Let Andrew be A, Pat be P, and Bernard be B. P = A + 25. B = A - 35. Total = A + (A + 25) + (A - 35) = 3A - 10 = 221. So 3A = 231, which means A = 77. Bernard received 77 - 35 = 42 toy cars."
      },
      {
        "question": (
          <div className="space-y-4">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">Type 2: Simultaneous Concept</span>
            <p>The total cost of 3 hairclips and 5 hairbands was $31. The total cost of 5 hairclips and 2 hairbands was $20. How much did each hairclip cost?</p>
            <img src="https://static.wixstatic.com/media/cb578d_49624b2ca4e547598671a6431a03556a~mv2.jpg" alt="Simultaneous Concept" className="w-full max-w-sm rounded-lg border border-gray-200 mt-2" />
          </div>
        ),
        "options": ["$2", "$3", "$4", "$5"],
        "answer": "$2",
        "explanation": "Multiply the first equation by 2: 6 clips + 10 bands = $62. Multiply the second equation by 5: 25 clips + 10 bands = $100. Find the difference: 19 clips = $38. Therefore, 1 clip costs $38 ÷ 19 = $2."
      },
      {
        "question": (
          <div className="space-y-4">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">Type 3: Systematic Listing</span>
            <p>Ken has some pens and he wants to pack them into boxes. If he packs them into boxes of 7, there will be 3 pens left. If he packs them into boxes of 6, he will be short of 3 pens. What is the smallest whole number of pens Ken has?</p>
            <img src="https://static.wixstatic.com/media/cb578d_b4203def533245da91d43756db759c98~mv2.png" alt="Systematic Listing" className="w-full max-w-sm rounded-lg border border-gray-200 mt-2" />
          </div>
        ),
        "options": ["45", "31", "27", "51"],
        "answer": "45",
        "explanation": "Multiples of 7 plus 3: 10, 17, 24, 31, 38, 45, 52. Multiples of 6 minus 3 (or plus 3 for a different number of boxes): 3, 9, 15, 21, 27, 33, 39, 45, 51. The smallest common number is 45."
      },
      {
        "question": (
          <div className="space-y-4">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">Type 4: Excess and Shortage</span>
            <p>A group of boys share a packet of erasers. If each boy gets 7 erasers, they need 6 more. If each gets 4 erasers, 3 are left. How many erasers are there?</p>
            <img src="https://static.wixstatic.com/media/cb578d_e4db09b10ee1463282c5ccc6ee4d0846~mv2.jpg" alt="Excess and Shortage" className="w-full max-w-sm rounded-lg border border-gray-200 mt-2" />
          </div>
        ),
        "options": ["15", "12", "21", "9"],
        "answer": "15",
        "explanation": "Difference in erasers per boy = 7 - 4 = 3. Total difference in erasers = 6 (shortage) + 3 (excess) = 9. Number of boys = 9 ÷ 3 = 3. Total erasers = (3 × 4) + 3 = 15."
      },
      {
        "question": (
          <div className="space-y-4">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">Type 5: Assumption Method</span>
            <p>AGrader bought 26 tables and chairs. A table costs $120 and a chair costs $80. The total cost was $2600. How many chairs were bought?</p>
            <img src="https://static.wixstatic.com/media/cb578d_2ae929a44b7840d4847353623acfd417~mv2.png" alt="Assumption Method" className="w-full max-w-sm rounded-lg border border-gray-200 mt-2" />
          </div>
        ),
        "options": ["13", "10", "15", "16"],
        "answer": "13",
        "explanation": "Assume all 26 items were chairs. Total cost would be 26 × $80 = $2080. The shortage is $2600 - $2080 = $520. The price difference between a table and a chair is $120 - $80 = $40. Number of tables = 520 ÷ 40 = 13. Therefore, number of chairs = 26 - 13 = 13."
      },
      {
        "question": (
          <div className="space-y-4">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">Type 6: Grouping Method</span>
            <p>Judy bought an equal number of muffins and tarts. A muffin costs $2 and a tart costs $1. She paid $201 in total. How many items did she buy in total?</p>
            <img src="https://static.wixstatic.com/media/cb578d_1f5c0524215e40a597799625d0b2403c~mv2.png" alt="Grouping Method" className="w-full max-w-sm rounded-lg border border-gray-200 mt-2" />
          </div>
        ),
        "options": ["134", "67", "201", "100"],
        "answer": "134",
        "explanation": "Since she bought an equal number, group 1 muffin and 1 tart together. Cost of 1 group = $2 + $1 = $3. Number of groups = 201 ÷ 3 = 67. Since each group has 2 items, total items = 67 × 2 = 134."
      }
    ]
  },

  {
    "id": "fractions",
    "title": "Fractions",
    "explanation": "Fractions represent parts of a whole. Key skills include the four operations, equivalent fractions, comparing fractions, finding a fraction of a set, and dividing a proper fraction by a whole number. Word problems often involve the 'Remainder Concept'.",
    "questions": [
      {
        "question": "Simplify 6/27 to its simplest form.",
        "options": [
          "4/18",
          "2/10",
          "3/9",
          "2/9"
        ],
        "answer": "2/9",
        "explanation": "Divide both numerator and denominator by their greatest common divisor."
      },
      {
        "question": "Simplify 12/21 to its simplest form.",
        "options": [
          "8/14",
          "4/7",
          "4/8",
          "5/7"
        ],
        "answer": "4/7",
        "explanation": "Divide both numerator and denominator by their greatest common divisor."
      },
      {
        "question": "Simplify 3/21 to its simplest form.",
        "options": [
          "2/14",
          "2/7",
          "1/7",
          "1/8"
        ],
        "answer": "1/7",
        "explanation": "Divide both numerator and denominator by their greatest common divisor."
      },
      {
        "question": "Simplify 3/18 to its simplest form.",
        "options": [
          "1/6",
          "2/12",
          "1/7",
          "2/6"
        ],
        "answer": "1/6",
        "explanation": "Divide both numerator and denominator by their greatest common divisor."
      },
      {
        "question": "Simplify 3/18 to its simplest form.",
        "options": [
          "2/6",
          "1/6",
          "1/7",
          "2/12"
        ],
        "answer": "1/6",
        "explanation": "Divide both numerator and denominator by their greatest common divisor."
      },
      {
        "question": "Simplify 3/21 to its simplest form.",
        "options": [
          "1/7",
          "2/14",
          "2/7",
          "1/8"
        ],
        "answer": "1/7",
        "explanation": "Divide both numerator and denominator by their greatest common divisor."
      },
      {
        "question": "Simplify 6/24 to its simplest form.",
        "options": [
          "2/8",
          "3/8",
          "2/9",
          "4/16"
        ],
        "answer": "2/8",
        "explanation": "Divide both numerator and denominator by their greatest common divisor."
      },
      {
        "question": "Simplify 3/18 to its simplest form.",
        "options": [
          "1/6",
          "2/12",
          "1/7",
          "2/6"
        ],
        "answer": "1/6",
        "explanation": "Divide both numerator and denominator by their greatest common divisor."
      },
      {
        "question": "Simplify 9/24 to its simplest form.",
        "options": [
          "3/8",
          "4/8",
          "6/16",
          "3/9"
        ],
        "answer": "3/8",
        "explanation": "Divide both numerator and denominator by their greatest common divisor."
      },
      {
        "question": "Simplify 3/18 to its simplest form.",
        "options": [
          "2/6",
          "1/7",
          "1/6",
          "2/12"
        ],
        "answer": "1/6",
        "explanation": "Divide both numerator and denominator by their greatest common divisor."
      }
    ]
  },
  {
    "id": "decimals",
    "title": "Decimals",
    "explanation": "Decimals are fractions with denominators of 10, 100, 1000, etc. You must master the four operations with decimals, rounding off to specific decimal places, and quickly multiplying or dividing by 10, 100, and 1000 by shifting the decimal point.",
    "questions": [
      {
        "question": "Multiply 1.9 by 2.",
        "options": [
          "0.4",
          "38.0",
          "4.8",
          "3.8"
        ],
        "answer": "3.8",
        "explanation": "Multiply as whole numbers then place the decimal point correctly."
      },
      {
        "question": "Multiply 3.5 by 8.",
        "options": [
          "29.0",
          "2.8",
          "28.0",
          "280.0"
        ],
        "answer": "28.0",
        "explanation": "Multiply as whole numbers then place the decimal point correctly."
      },
      {
        "question": "Multiply 1.6 by 7.",
        "options": [
          "112.0",
          "12.2",
          "1.1",
          "11.2"
        ],
        "answer": "11.2",
        "explanation": "Multiply as whole numbers then place the decimal point correctly."
      },
      {
        "question": "Multiply 7.9 by 3.",
        "options": [
          "23.7",
          "2.4",
          "24.7",
          "237.0"
        ],
        "answer": "23.7",
        "explanation": "Multiply as whole numbers then place the decimal point correctly."
      },
      {
        "question": "Multiply 6.8 by 8.",
        "options": [
          "544.0",
          "5.4",
          "55.4",
          "54.4"
        ],
        "answer": "54.4",
        "explanation": "Multiply as whole numbers then place the decimal point correctly."
      },
      {
        "question": "Multiply 9.0 by 9.",
        "options": [
          "81.0",
          "8.1",
          "82.0",
          "810.0"
        ],
        "answer": "81.0",
        "explanation": "Multiply as whole numbers then place the decimal point correctly."
      },
      {
        "question": "Multiply 9.2 by 7.",
        "options": [
          "644.0",
          "6.4",
          "65.4",
          "64.4"
        ],
        "answer": "64.4",
        "explanation": "Multiply as whole numbers then place the decimal point correctly."
      },
      {
        "question": "Multiply 4.3 by 7.",
        "options": [
          "3.0",
          "301.0",
          "30.1",
          "31.1"
        ],
        "answer": "30.1",
        "explanation": "Multiply as whole numbers then place the decimal point correctly."
      },
      {
        "question": "Multiply 2.2 by 2.",
        "options": [
          "0.4",
          "5.4",
          "4.4",
          "44.0"
        ],
        "answer": "4.4",
        "explanation": "Multiply as whole numbers then place the decimal point correctly."
      },
      {
        "question": "Multiply 2.5 by 5.",
        "options": [
          "13.5",
          "1.2",
          "125.0",
          "12.5"
        ],
        "answer": "12.5",
        "explanation": "Multiply as whole numbers then place the decimal point correctly."
      }
    ]
  },
  {
    "id": "percentage",
    "title": "Percentage",
    "explanation": "Percentage means 'out of 100'. Key concepts include expressing fractions or decimals as percentages, finding the percentage of a quantity, calculating discount, GST, annual interest, and percentage increase/decrease.",
    "questions": [
      {
        "question": "Find 25% of $60.",
        "options": [
          "$30",
          "$20",
          "$15",
          "$13"
        ],
        "answer": "$15",
        "explanation": "Convert 25% to a fraction or decimal and multiply by 60."
      },
      {
        "question": "Find 50% of $90.",
        "options": [
          "$90",
          "$43",
          "$50",
          "$45"
        ],
        "answer": "$45",
        "explanation": "Convert 50% to a fraction or decimal and multiply by 90."
      },
      {
        "question": "Find 50% of $90.",
        "options": [
          "$45",
          "$90",
          "$43",
          "$50"
        ],
        "answer": "$45",
        "explanation": "Convert 50% to a fraction or decimal and multiply by 90."
      },
      {
        "question": "Find 50% of $50.",
        "options": [
          "$50",
          "$25",
          "$30",
          "$23"
        ],
        "answer": "$25",
        "explanation": "Convert 50% to a fraction or decimal and multiply by 50."
      },
      {
        "question": "Find 25% of $50.",
        "options": [
          "$24",
          "$17",
          "$12",
          "$10"
        ],
        "answer": "$12",
        "explanation": "Convert 25% to a fraction or decimal and multiply by 50."
      },
      {
        "question": "Find 25% of $40.",
        "options": [
          "$10",
          "$15",
          "$8",
          "$20"
        ],
        "answer": "$10",
        "explanation": "Convert 25% to a fraction or decimal and multiply by 40."
      },
      {
        "question": "Find 20% of $80.",
        "options": [
          "$14",
          "$32",
          "$21",
          "$16"
        ],
        "answer": "$16",
        "explanation": "Convert 20% to a fraction or decimal and multiply by 80."
      },
      {
        "question": "Find 50% of $50.",
        "options": [
          "$30",
          "$25",
          "$23",
          "$50"
        ],
        "answer": "$25",
        "explanation": "Convert 50% to a fraction or decimal and multiply by 50."
      },
      {
        "question": "Find 25% of $60.",
        "options": [
          "$20",
          "$13",
          "$30",
          "$15"
        ],
        "answer": "$15",
        "explanation": "Convert 25% to a fraction or decimal and multiply by 60."
      },
      {
        "question": "Find 10% of $20.",
        "options": [
          "$0",
          "$2",
          "$4",
          "$7"
        ],
        "answer": "$2",
        "explanation": "Convert 10% to a fraction or decimal and multiply by 20."
      }
    ]
  },
  {
    "id": "ratio",
    "title": "Ratio (P6)",
    "explanation": "Ratio compares two or more quantities of the same kind. Key skills include expressing ratios in simplest form, equivalent ratios, changing ratios (before and after concept), and identifying the unchanged quantity.",
    "questions": [
      {
        "question": "There are 15 boys and 12 girls in a class. What is the ratio of boys to girls in its simplest form?",
        "options": [
          "5:4",
          "1:4",
          "4:5",
          "10:8"
        ],
        "answer": "5:4",
        "explanation": "Divide both numbers by their common factor 3 to get 5:4."
      },
      {
        "question": "There are 15 boys and 12 girls in a class. What is the ratio of boys to girls in its simplest form?",
        "options": [
          "5:4",
          "1:4",
          "10:8",
          "4:5"
        ],
        "answer": "5:4",
        "explanation": "Divide both numbers by their common factor 3 to get 5:4."
      },
      {
        "question": "There are 15 boys and 6 girls in a class. What is the ratio of boys to girls in its simplest form?",
        "options": [
          "2:5",
          "10:4",
          "5:2",
          "1:2"
        ],
        "answer": "5:2",
        "explanation": "Divide both numbers by their common factor 3 to get 5:2."
      },
      {
        "question": "There are 6 boys and 15 girls in a class. What is the ratio of boys to girls in its simplest form?",
        "options": [
          "5:2",
          "1:5",
          "2:5",
          "4:10"
        ],
        "answer": "2:5",
        "explanation": "Divide both numbers by their common factor 3 to get 2:5."
      },
      {
        "question": "There are 15 boys and 12 girls in a class. What is the ratio of boys to girls in its simplest form?",
        "options": [
          "1:4",
          "4:5",
          "5:4",
          "10:8"
        ],
        "answer": "5:4",
        "explanation": "Divide both numbers by their common factor 3 to get 5:4."
      },
      {
        "question": "There are 9 boys and 6 girls in a class. What is the ratio of boys to girls in its simplest form?",
        "options": [
          "1:2",
          "6:4",
          "3:2",
          "2:3"
        ],
        "answer": "3:2",
        "explanation": "Divide both numbers by their common factor 3 to get 3:2."
      },
      {
        "question": "There are 9 boys and 12 girls in a class. What is the ratio of boys to girls in its simplest form?",
        "options": [
          "4:3",
          "1:4",
          "3:4",
          "6:8"
        ],
        "answer": "3:4",
        "explanation": "Divide both numbers by their common factor 3 to get 3:4."
      },
      {
        "question": "There are 18 boys and 15 girls in a class. What is the ratio of boys to girls in its simplest form?",
        "options": [
          "12:10",
          "6:5",
          "1:5",
          "5:6"
        ],
        "answer": "6:5",
        "explanation": "Divide both numbers by their common factor 3 to get 6:5."
      },
      {
        "question": "There are 18 boys and 15 girls in a class. What is the ratio of boys to girls in its simplest form?",
        "options": [
          "1:5",
          "5:6",
          "6:5",
          "12:10"
        ],
        "answer": "6:5",
        "explanation": "Divide both numbers by their common factor 3 to get 6:5."
      },
      {
        "question": "There are 18 boys and 15 girls in a class. What is the ratio of boys to girls in its simplest form?",
        "options": [
          "1:5",
          "12:10",
          "6:5",
          "5:6"
        ],
        "answer": "6:5",
        "explanation": "Divide both numbers by their common factor 3 to get 6:5."
      }
    ]
  },
  {
    "id": "number-patterns",
    "title": "Number Patterns",
    "explanation": "Number and visual patterns require you to observe the relationship between consecutive terms. Strategies include finding common differences, common ratios, or identifying square/cube number sequences.",
    "questions": [
      {
        "question": "Find the next number in the pattern: 1, 4, 7, 10, ...",
        "options": [
          "14",
          "12",
          "16",
          "13"
        ],
        "answer": "13",
        "explanation": "The pattern increases by a constant difference of 3."
      },
      {
        "question": "Find the next number in the pattern: 2, 5, 8, 11, ...",
        "options": [
          "15",
          "17",
          "13",
          "14"
        ],
        "answer": "14",
        "explanation": "The pattern increases by a constant difference of 3."
      },
      {
        "question": "Find the next number in the pattern: 5, 8, 11, 14, ...",
        "options": [
          "16",
          "18",
          "20",
          "17"
        ],
        "answer": "17",
        "explanation": "The pattern increases by a constant difference of 3."
      },
      {
        "question": "Find the next number in the pattern: 2, 6, 10, 14, ...",
        "options": [
          "18",
          "17",
          "22",
          "19"
        ],
        "answer": "18",
        "explanation": "The pattern increases by a constant difference of 4."
      },
      {
        "question": "Find the next number in the pattern: 4, 9, 14, 19, ...",
        "options": [
          "24",
          "25",
          "29",
          "23"
        ],
        "answer": "24",
        "explanation": "The pattern increases by a constant difference of 5."
      },
      {
        "question": "Find the next number in the pattern: 10, 13, 16, 19, ...",
        "options": [
          "23",
          "25",
          "21",
          "22"
        ],
        "answer": "22",
        "explanation": "The pattern increases by a constant difference of 3."
      },
      {
        "question": "Find the next number in the pattern: 1, 4, 7, 10, ...",
        "options": [
          "16",
          "14",
          "12",
          "13"
        ],
        "answer": "13",
        "explanation": "The pattern increases by a constant difference of 3."
      },
      {
        "question": "Find the next number in the pattern: 4, 9, 14, 19, ...",
        "options": [
          "24",
          "29",
          "23",
          "25"
        ],
        "answer": "24",
        "explanation": "The pattern increases by a constant difference of 5."
      },
      {
        "question": "Find the next number in the pattern: 1, 6, 11, 16, ...",
        "options": [
          "26",
          "21",
          "22",
          "20"
        ],
        "answer": "21",
        "explanation": "The pattern increases by a constant difference of 5."
      },
      {
        "question": "Find the next number in the pattern: 8, 10, 12, 14, ...",
        "options": [
          "15",
          "16",
          "17",
          "18"
        ],
        "answer": "16",
        "explanation": "The pattern increases by a constant difference of 2."
      }
    ]
  },
  {
    "id": "algebra",
    "title": "Algebra (P6)",
    "explanation": "Algebra involves using letters to represent unknown numbers. Key skills include writing algebraic expressions, evaluating them by substituting values, and solving simple linear equations.",
    "questions": [
      {
        "question": "Evaluate the expression 3y + 2 when y = 3.",
        "options": [
          "11",
          "9",
          "8",
          "14"
        ],
        "answer": "11",
        "explanation": "Substitute y = 3 into the expression: 3(3) + 2 = 11."
      },
      {
        "question": "Evaluate the expression 3y + 2 when y = 3.",
        "options": [
          "11",
          "8",
          "14",
          "9"
        ],
        "answer": "11",
        "explanation": "Substitute y = 3 into the expression: 3(3) + 2 = 11."
      },
      {
        "question": "Evaluate the expression 3y + 2 when y = 2.",
        "options": [
          "8",
          "6",
          "11",
          "7"
        ],
        "answer": "8",
        "explanation": "Substitute y = 2 into the expression: 3(2) + 2 = 8."
      },
      {
        "question": "Evaluate the expression 3y + 2 when y = 4.",
        "options": [
          "12",
          "9",
          "14",
          "17"
        ],
        "answer": "14",
        "explanation": "Substitute y = 4 into the expression: 3(4) + 2 = 14."
      },
      {
        "question": "Evaluate the expression 3y + 2 when y = 5.",
        "options": [
          "17",
          "20",
          "15",
          "10"
        ],
        "answer": "17",
        "explanation": "Substitute y = 5 into the expression: 3(5) + 2 = 17."
      },
      {
        "question": "Evaluate the expression 3y + 2 when y = 5.",
        "options": [
          "10",
          "15",
          "17",
          "20"
        ],
        "answer": "17",
        "explanation": "Substitute y = 5 into the expression: 3(5) + 2 = 17."
      },
      {
        "question": "Evaluate the expression 3y + 2 when y = 3.",
        "options": [
          "9",
          "14",
          "11",
          "8"
        ],
        "answer": "11",
        "explanation": "Substitute y = 3 into the expression: 3(3) + 2 = 11."
      },
      {
        "question": "Evaluate the expression 3y + 2 when y = 4.",
        "options": [
          "9",
          "17",
          "14",
          "12"
        ],
        "answer": "14",
        "explanation": "Substitute y = 4 into the expression: 3(4) + 2 = 14."
      },
      {
        "question": "Evaluate the expression 3y + 2 when y = 5.",
        "options": [
          "20",
          "15",
          "10",
          "17"
        ],
        "answer": "17",
        "explanation": "Substitute y = 5 into the expression: 3(5) + 2 = 17."
      },
      {
        "question": "Evaluate the expression 3y + 2 when y = 5.",
        "options": [
          "20",
          "17",
          "10",
          "15"
        ],
        "answer": "17",
        "explanation": "Substitute y = 5 into the expression: 3(5) + 2 = 17."
      }
    ]
  },
  {
    "id": "measurement",
    "title": "Measurement",
    "explanation": "Measurement covers length (km, m, cm), mass (kg, g), volume (L, ml), and time (12-hour and 24-hour clocks). Mastery of conversion between units and calculating time duration is crucial.",
    "questions": [
      {
        "question": "Convert 1 km 839 m to meters.",
        "options": [
          "1939 m",
          "1839 m",
          "1739 m",
          "1839 m"
        ],
        "answer": "1839 m",
        "explanation": "Since 1 km = 1000 m, 1 km = 1000 m. Add 839 m to get 1839 m."
      },
      {
        "question": "Convert 1 km 268 m to meters.",
        "options": [
          "1268 m",
          "1268 m",
          "1168 m",
          "1368 m"
        ],
        "answer": "1268 m",
        "explanation": "Since 1 km = 1000 m, 1 km = 1000 m. Add 268 m to get 1268 m."
      },
      {
        "question": "Convert 2 km 689 m to meters.",
        "options": [
          "2589 m",
          "2689 m",
          "2789 m",
          "2689 m"
        ],
        "answer": "2689 m",
        "explanation": "Since 1 km = 1000 m, 2 km = 2000 m. Add 689 m to get 2689 m."
      },
      {
        "question": "Convert 3 km 422 m to meters.",
        "options": [
          "3322 m",
          "3422 m",
          "3522 m",
          "3422 m"
        ],
        "answer": "3422 m",
        "explanation": "Since 1 km = 1000 m, 3 km = 3000 m. Add 422 m to get 3422 m."
      },
      {
        "question": "Convert 5 km 883 m to meters.",
        "options": [
          "5883 m",
          "5783 m",
          "5983 m",
          "5883 m"
        ],
        "answer": "5883 m",
        "explanation": "Since 1 km = 1000 m, 5 km = 5000 m. Add 883 m to get 5883 m."
      },
      {
        "question": "Convert 5 km 694 m to meters.",
        "options": [
          "5794 m",
          "5694 m",
          "5594 m",
          "5694 m"
        ],
        "answer": "5694 m",
        "explanation": "Since 1 km = 1000 m, 5 km = 5000 m. Add 694 m to get 5694 m."
      },
      {
        "question": "Convert 2 km 73 m to meters.",
        "options": [
          "273 m",
          "2173 m",
          "2073 m",
          "1973 m"
        ],
        "answer": "2073 m",
        "explanation": "Since 1 km = 1000 m, 2 km = 2000 m. Add 73 m to get 2073 m."
      },
      {
        "question": "Convert 1 km 656 m to meters.",
        "options": [
          "1756 m",
          "1556 m",
          "1656 m",
          "1656 m"
        ],
        "answer": "1656 m",
        "explanation": "Since 1 km = 1000 m, 1 km = 1000 m. Add 656 m to get 1656 m."
      },
      {
        "question": "Convert 1 km 598 m to meters.",
        "options": [
          "1598 m",
          "1598 m",
          "1698 m",
          "1498 m"
        ],
        "answer": "1598 m",
        "explanation": "Since 1 km = 1000 m, 1 km = 1000 m. Add 598 m to get 1598 m."
      },
      {
        "question": "Convert 2 km 132 m to meters.",
        "options": [
          "2032 m",
          "2132 m",
          "2232 m",
          "2132 m"
        ],
        "answer": "2132 m",
        "explanation": "Since 1 km = 1000 m, 2 km = 2000 m. Add 132 m to get 2132 m."
      }
    ]
  },
  {
    "id": "area-perimeter",
    "title": "Area & Perimeter",
    "explanation": "Area is the space enclosed by a figure, while perimeter is the distance around it. You must know the formulas for squares, rectangles, triangles, parallelograms, rhombuses, and trapeziums.",
    "questions": [
      {
        "question": "Find the area of a rectangle with length 8 cm and width 6 cm.",
        "options": [
          "48 cm\u00b2",
          "28 cm\u00b2",
          "50 cm\u00b2",
          "14 cm\u00b2"
        ],
        "answer": "48 cm\u00b2",
        "explanation": "Area of rectangle = length \u00d7 width."
      },
      {
        "question": "Find the area of a rectangle with length 6 cm and width 4 cm.",
        "options": [
          "26 cm\u00b2",
          "20 cm\u00b2",
          "24 cm\u00b2",
          "10 cm\u00b2"
        ],
        "answer": "24 cm\u00b2",
        "explanation": "Area of rectangle = length \u00d7 width."
      },
      {
        "question": "Find the area of a rectangle with length 7 cm and width 2 cm.",
        "options": [
          "9 cm\u00b2",
          "18 cm\u00b2",
          "16 cm\u00b2",
          "14 cm\u00b2"
        ],
        "answer": "14 cm\u00b2",
        "explanation": "Area of rectangle = length \u00d7 width."
      },
      {
        "question": "Find the area of a rectangle with length 7 cm and width 4 cm.",
        "options": [
          "11 cm\u00b2",
          "22 cm\u00b2",
          "30 cm\u00b2",
          "28 cm\u00b2"
        ],
        "answer": "28 cm\u00b2",
        "explanation": "Area of rectangle = length \u00d7 width."
      },
      {
        "question": "Find the area of a rectangle with length 12 cm and width 2 cm.",
        "options": [
          "28 cm\u00b2",
          "24 cm\u00b2",
          "26 cm\u00b2",
          "14 cm\u00b2"
        ],
        "answer": "24 cm\u00b2",
        "explanation": "Area of rectangle = length \u00d7 width."
      },
      {
        "question": "Find the area of a rectangle with length 5 cm and width 5 cm.",
        "options": [
          "27 cm\u00b2",
          "20 cm\u00b2",
          "10 cm\u00b2",
          "25 cm\u00b2"
        ],
        "answer": "25 cm\u00b2",
        "explanation": "Area of rectangle = length \u00d7 width."
      },
      {
        "question": "Find the area of a rectangle with length 7 cm and width 5 cm.",
        "options": [
          "35 cm\u00b2",
          "37 cm\u00b2",
          "12 cm\u00b2",
          "24 cm\u00b2"
        ],
        "answer": "35 cm\u00b2",
        "explanation": "Area of rectangle = length \u00d7 width."
      },
      {
        "question": "Find the area of a rectangle with length 10 cm and width 4 cm.",
        "options": [
          "42 cm\u00b2",
          "40 cm\u00b2",
          "28 cm\u00b2",
          "14 cm\u00b2"
        ],
        "answer": "40 cm\u00b2",
        "explanation": "Area of rectangle = length \u00d7 width."
      },
      {
        "question": "Find the area of a rectangle with length 9 cm and width 6 cm.",
        "options": [
          "30 cm\u00b2",
          "54 cm\u00b2",
          "56 cm\u00b2",
          "15 cm\u00b2"
        ],
        "answer": "54 cm\u00b2",
        "explanation": "Area of rectangle = length \u00d7 width."
      },
      {
        "question": "Find the area of a rectangle with length 11 cm and width 2 cm.",
        "options": [
          "26 cm\u00b2",
          "22 cm\u00b2",
          "13 cm\u00b2",
          "24 cm\u00b2"
        ],
        "answer": "22 cm\u00b2",
        "explanation": "Area of rectangle = length \u00d7 width."
      }
    ]
  },
  {
    "id": "volume",
    "title": "Volume",
    "explanation": "Volume refers to the amount of space an object occupies. Key concepts include the volume of cubes and cuboids (Length x Breadth x Height), capacity of liquids, and rate of flow (e.g., liters per minute).",
    "questions": [
      {
        "question": "Find the volume of a cube with an edge of 4 cm.",
        "options": [
          "12 cm\u00b3",
          "68 cm\u00b3",
          "64 cm\u00b3",
          "16 cm\u00b3"
        ],
        "answer": "64 cm\u00b3",
        "explanation": "Volume of a cube = edge \u00d7 edge \u00d7 edge."
      },
      {
        "question": "Find the volume of a cube with an edge of 8 cm.",
        "options": [
          "24 cm\u00b3",
          "64 cm\u00b3",
          "512 cm\u00b3",
          "520 cm\u00b3"
        ],
        "answer": "512 cm\u00b3",
        "explanation": "Volume of a cube = edge \u00d7 edge \u00d7 edge."
      },
      {
        "question": "Find the volume of a cube with an edge of 4 cm.",
        "options": [
          "16 cm\u00b3",
          "64 cm\u00b3",
          "12 cm\u00b3",
          "68 cm\u00b3"
        ],
        "answer": "64 cm\u00b3",
        "explanation": "Volume of a cube = edge \u00d7 edge \u00d7 edge."
      },
      {
        "question": "Find the volume of a cube with an edge of 3 cm.",
        "options": [
          "30 cm\u00b3",
          "9 cm\u00b3",
          "27 cm\u00b3",
          "9 cm\u00b3"
        ],
        "answer": "27 cm\u00b3",
        "explanation": "Volume of a cube = edge \u00d7 edge \u00d7 edge."
      },
      {
        "question": "Find the volume of a cube with an edge of 3 cm.",
        "options": [
          "27 cm\u00b3",
          "9 cm\u00b3",
          "9 cm\u00b3",
          "30 cm\u00b3"
        ],
        "answer": "27 cm\u00b3",
        "explanation": "Volume of a cube = edge \u00d7 edge \u00d7 edge."
      },
      {
        "question": "Find the volume of a cube with an edge of 8 cm.",
        "options": [
          "512 cm\u00b3",
          "520 cm\u00b3",
          "64 cm\u00b3",
          "24 cm\u00b3"
        ],
        "answer": "512 cm\u00b3",
        "explanation": "Volume of a cube = edge \u00d7 edge \u00d7 edge."
      },
      {
        "question": "Find the volume of a cube with an edge of 6 cm.",
        "options": [
          "18 cm\u00b3",
          "216 cm\u00b3",
          "222 cm\u00b3",
          "36 cm\u00b3"
        ],
        "answer": "216 cm\u00b3",
        "explanation": "Volume of a cube = edge \u00d7 edge \u00d7 edge."
      },
      {
        "question": "Find the volume of a cube with an edge of 3 cm.",
        "options": [
          "27 cm\u00b3",
          "30 cm\u00b3",
          "9 cm\u00b3",
          "9 cm\u00b3"
        ],
        "answer": "27 cm\u00b3",
        "explanation": "Volume of a cube = edge \u00d7 edge \u00d7 edge."
      },
      {
        "question": "Find the volume of a cube with an edge of 8 cm.",
        "options": [
          "24 cm\u00b3",
          "64 cm\u00b3",
          "520 cm\u00b3",
          "512 cm\u00b3"
        ],
        "answer": "512 cm\u00b3",
        "explanation": "Volume of a cube = edge \u00d7 edge \u00d7 edge."
      },
      {
        "question": "Find the volume of a cube with an edge of 8 cm.",
        "options": [
          "520 cm\u00b3",
          "64 cm\u00b3",
          "24 cm\u00b3",
          "512 cm\u00b3"
        ],
        "answer": "512 cm\u00b3",
        "explanation": "Volume of a cube = edge \u00d7 edge \u00d7 edge."
      }
    ]
  },
  {
    "id": "angles-geometry",
    "title": "Angles & Geometry",
    "explanation": "Geometry involves understanding properties of angles (on a straight line, at a point, vertically opposite) and figures (triangles, quadrilaterals like parallelograms and rhombuses). Finding unknown angles relies heavily on these properties.",
    "questions": [
      {
        "question": "Angles on a straight line add up to 180\u00b0. If one angle is 73\u00b0, find the adjacent angle.",
        "options": [
          "117\u00b0",
          "97\u00b0",
          "17\u00b0",
          "107\u00b0"
        ],
        "answer": "107\u00b0",
        "explanation": "Subtract the given angle from 180\u00b0."
      },
      {
        "question": "Angles on a straight line add up to 180\u00b0. If one angle is 43\u00b0, find the adjacent angle.",
        "options": [
          "147\u00b0",
          "127\u00b0",
          "47\u00b0",
          "137\u00b0"
        ],
        "answer": "137\u00b0",
        "explanation": "Subtract the given angle from 180\u00b0."
      },
      {
        "question": "Angles on a straight line add up to 180\u00b0. If one angle is 66\u00b0, find the adjacent angle.",
        "options": [
          "114\u00b0",
          "124\u00b0",
          "24\u00b0",
          "104\u00b0"
        ],
        "answer": "114\u00b0",
        "explanation": "Subtract the given angle from 180\u00b0."
      },
      {
        "question": "Angles on a straight line add up to 180\u00b0. If one angle is 65\u00b0, find the adjacent angle.",
        "options": [
          "105\u00b0",
          "115\u00b0",
          "125\u00b0",
          "25\u00b0"
        ],
        "answer": "115\u00b0",
        "explanation": "Subtract the given angle from 180\u00b0."
      },
      {
        "question": "Angles on a straight line add up to 180\u00b0. If one angle is 41\u00b0, find the adjacent angle.",
        "options": [
          "49\u00b0",
          "139\u00b0",
          "149\u00b0",
          "129\u00b0"
        ],
        "answer": "139\u00b0",
        "explanation": "Subtract the given angle from 180\u00b0."
      },
      {
        "question": "Angles on a straight line add up to 180\u00b0. If one angle is 64\u00b0, find the adjacent angle.",
        "options": [
          "26\u00b0",
          "106\u00b0",
          "116\u00b0",
          "126\u00b0"
        ],
        "answer": "116\u00b0",
        "explanation": "Subtract the given angle from 180\u00b0."
      },
      {
        "question": "Angles on a straight line add up to 180\u00b0. If one angle is 52\u00b0, find the adjacent angle.",
        "options": [
          "128\u00b0",
          "118\u00b0",
          "138\u00b0",
          "38\u00b0"
        ],
        "answer": "128\u00b0",
        "explanation": "Subtract the given angle from 180\u00b0."
      },
      {
        "question": "Angles on a straight line add up to 180\u00b0. If one angle is 47\u00b0, find the adjacent angle.",
        "options": [
          "133\u00b0",
          "123\u00b0",
          "143\u00b0",
          "43\u00b0"
        ],
        "answer": "133\u00b0",
        "explanation": "Subtract the given angle from 180\u00b0."
      },
      {
        "question": "Angles on a straight line add up to 180\u00b0. If one angle is 48\u00b0, find the adjacent angle.",
        "options": [
          "142\u00b0",
          "122\u00b0",
          "132\u00b0",
          "42\u00b0"
        ],
        "answer": "132\u00b0",
        "explanation": "Subtract the given angle from 180\u00b0."
      },
      {
        "question": "Angles on a straight line add up to 180\u00b0. If one angle is 72\u00b0, find the adjacent angle.",
        "options": [
          "108\u00b0",
          "98\u00b0",
          "118\u00b0",
          "18\u00b0"
        ],
        "answer": "108\u00b0",
        "explanation": "Subtract the given angle from 180\u00b0."
      }
    ]
  },
  {
    "id": "circles",
    "title": "Circles (P6)",
    "explanation": "A circle is defined by its center, radius, and diameter. You must calculate the circumference (\u03c0 x d) and area (\u03c0 x r x r). Problems often involve semi-circles, quarter circles, and complex composite figures.",
    "questions": [
      {
        "question": "Find the area of a circle with radius 14 cm. (Take \u03c0 = 22/7)",
        "options": [
          "88 cm\u00b2",
          "626 cm\u00b2",
          "602 cm\u00b2",
          "616 cm\u00b2"
        ],
        "answer": "616 cm\u00b2",
        "explanation": "Area = \u03c0 \u00d7 r \u00d7 r."
      },
      {
        "question": "Find the area of a circle with radius 14 cm. (Take \u03c0 = 22/7)",
        "options": [
          "88 cm\u00b2",
          "626 cm\u00b2",
          "616 cm\u00b2",
          "602 cm\u00b2"
        ],
        "answer": "616 cm\u00b2",
        "explanation": "Area = \u03c0 \u00d7 r \u00d7 r."
      },
      {
        "question": "Find the area of a circle with radius 21 cm. (Take \u03c0 = 22/7)",
        "options": [
          "1386 cm\u00b2",
          "1396 cm\u00b2",
          "1372 cm\u00b2",
          "132 cm\u00b2"
        ],
        "answer": "1386 cm\u00b2",
        "explanation": "Area = \u03c0 \u00d7 r \u00d7 r."
      },
      {
        "question": "Find the area of a circle with radius 14 cm. (Take \u03c0 = 22/7)",
        "options": [
          "88 cm\u00b2",
          "602 cm\u00b2",
          "626 cm\u00b2",
          "616 cm\u00b2"
        ],
        "answer": "616 cm\u00b2",
        "explanation": "Area = \u03c0 \u00d7 r \u00d7 r."
      },
      {
        "question": "Find the area of a circle with radius 14 cm. (Take \u03c0 = 22/7)",
        "options": [
          "88 cm\u00b2",
          "616 cm\u00b2",
          "626 cm\u00b2",
          "602 cm\u00b2"
        ],
        "answer": "616 cm\u00b2",
        "explanation": "Area = \u03c0 \u00d7 r \u00d7 r."
      },
      {
        "question": "Find the area of a circle with radius 14 cm. (Take \u03c0 = 22/7)",
        "options": [
          "602 cm\u00b2",
          "616 cm\u00b2",
          "626 cm\u00b2",
          "88 cm\u00b2"
        ],
        "answer": "616 cm\u00b2",
        "explanation": "Area = \u03c0 \u00d7 r \u00d7 r."
      },
      {
        "question": "Find the area of a circle with radius 7 cm. (Take \u03c0 = 22/7)",
        "options": [
          "44 cm\u00b2",
          "140 cm\u00b2",
          "154 cm\u00b2",
          "164 cm\u00b2"
        ],
        "answer": "154 cm\u00b2",
        "explanation": "Area = \u03c0 \u00d7 r \u00d7 r."
      },
      {
        "question": "Find the area of a circle with radius 14 cm. (Take \u03c0 = 22/7)",
        "options": [
          "602 cm\u00b2",
          "626 cm\u00b2",
          "88 cm\u00b2",
          "616 cm\u00b2"
        ],
        "answer": "616 cm\u00b2",
        "explanation": "Area = \u03c0 \u00d7 r \u00d7 r."
      },
      {
        "question": "Find the area of a circle with radius 14 cm. (Take \u03c0 = 22/7)",
        "options": [
          "626 cm\u00b2",
          "602 cm\u00b2",
          "616 cm\u00b2",
          "88 cm\u00b2"
        ],
        "answer": "616 cm\u00b2",
        "explanation": "Area = \u03c0 \u00d7 r \u00d7 r."
      },
      {
        "question": "Find the area of a circle with radius 14 cm. (Take \u03c0 = 22/7)",
        "options": [
          "602 cm\u00b2",
          "626 cm\u00b2",
          "88 cm\u00b2",
          "616 cm\u00b2"
        ],
        "answer": "616 cm\u00b2",
        "explanation": "Area = \u03c0 \u00d7 r \u00d7 r."
      }
    ]
  },
  {
    "id": "nets",
    "title": "Nets",
    "explanation": "A net is a 2D shape that can be folded to form a 3D solid. You must be able to identify and draw nets for cubes, cuboids, prisms, and pyramids, and visualize which edges meet when folded.",
    "questions": [
      {
        "question": "How many square faces does the net of a cube have? (Question 1)",
        "options": [
          "4",
          "8",
          "6",
          "5"
        ],
        "answer": "6",
        "explanation": "A cube is composed of 6 identical square faces."
      },
      {
        "question": "How many square faces does the net of a cube have? (Question 2)",
        "options": [
          "5",
          "6",
          "8",
          "4"
        ],
        "answer": "6",
        "explanation": "A cube is composed of 6 identical square faces."
      },
      {
        "question": "How many square faces does the net of a cube have? (Question 3)",
        "options": [
          "4",
          "6",
          "8",
          "5"
        ],
        "answer": "6",
        "explanation": "A cube is composed of 6 identical square faces."
      },
      {
        "question": "How many square faces does the net of a cube have? (Question 4)",
        "options": [
          "6",
          "8",
          "5",
          "4"
        ],
        "answer": "6",
        "explanation": "A cube is composed of 6 identical square faces."
      },
      {
        "question": "How many square faces does the net of a cube have? (Question 5)",
        "options": [
          "8",
          "5",
          "6",
          "4"
        ],
        "answer": "6",
        "explanation": "A cube is composed of 6 identical square faces."
      },
      {
        "question": "How many square faces does the net of a cube have? (Question 6)",
        "options": [
          "4",
          "6",
          "5",
          "8"
        ],
        "answer": "6",
        "explanation": "A cube is composed of 6 identical square faces."
      },
      {
        "question": "How many square faces does the net of a cube have? (Question 7)",
        "options": [
          "4",
          "5",
          "8",
          "6"
        ],
        "answer": "6",
        "explanation": "A cube is composed of 6 identical square faces."
      },
      {
        "question": "How many square faces does the net of a cube have? (Question 8)",
        "options": [
          "6",
          "8",
          "4",
          "5"
        ],
        "answer": "6",
        "explanation": "A cube is composed of 6 identical square faces."
      },
      {
        "question": "How many square faces does the net of a cube have? (Question 9)",
        "options": [
          "4",
          "8",
          "5",
          "6"
        ],
        "answer": "6",
        "explanation": "A cube is composed of 6 identical square faces."
      },
      {
        "question": "How many square faces does the net of a cube have? (Question 10)",
        "options": [
          "8",
          "5",
          "6",
          "4"
        ],
        "answer": "6",
        "explanation": "A cube is composed of 6 identical square faces."
      }
    ]
  },
  {
    "id": "data-analysis",
    "title": "Data Analysis",
    "explanation": "Data analysis involves reading, interpreting, and drawing conclusions from data presented in tables, bar graphs, and line graphs. Pay attention to the scales on the axes.",
    "questions": [
      {
        "question": "In a bar graph, the bar for 'Apples' reaches 66. How many apples are there? (Question 1)",
        "options": [
          "66",
          "61",
          "132",
          "71"
        ],
        "answer": "66",
        "explanation": "Read the value directly from the y-axis of the bar graph."
      },
      {
        "question": "In a bar graph, the bar for 'Apples' reaches 78. How many apples are there? (Question 2)",
        "options": [
          "73",
          "83",
          "156",
          "78"
        ],
        "answer": "78",
        "explanation": "Read the value directly from the y-axis of the bar graph."
      },
      {
        "question": "In a bar graph, the bar for 'Apples' reaches 44. How many apples are there? (Question 3)",
        "options": [
          "49",
          "88",
          "44",
          "39"
        ],
        "answer": "44",
        "explanation": "Read the value directly from the y-axis of the bar graph."
      },
      {
        "question": "In a bar graph, the bar for 'Apples' reaches 78. How many apples are there? (Question 4)",
        "options": [
          "73",
          "156",
          "83",
          "78"
        ],
        "answer": "78",
        "explanation": "Read the value directly from the y-axis of the bar graph."
      },
      {
        "question": "In a bar graph, the bar for 'Apples' reaches 70. How many apples are there? (Question 5)",
        "options": [
          "65",
          "70",
          "75",
          "140"
        ],
        "answer": "70",
        "explanation": "Read the value directly from the y-axis of the bar graph."
      },
      {
        "question": "In a bar graph, the bar for 'Apples' reaches 24. How many apples are there? (Question 6)",
        "options": [
          "29",
          "19",
          "48",
          "24"
        ],
        "answer": "24",
        "explanation": "Read the value directly from the y-axis of the bar graph."
      },
      {
        "question": "In a bar graph, the bar for 'Apples' reaches 74. How many apples are there? (Question 7)",
        "options": [
          "69",
          "148",
          "79",
          "74"
        ],
        "answer": "74",
        "explanation": "Read the value directly from the y-axis of the bar graph."
      },
      {
        "question": "In a bar graph, the bar for 'Apples' reaches 40. How many apples are there? (Question 8)",
        "options": [
          "45",
          "80",
          "40",
          "35"
        ],
        "answer": "40",
        "explanation": "Read the value directly from the y-axis of the bar graph."
      },
      {
        "question": "In a bar graph, the bar for 'Apples' reaches 78. How many apples are there? (Question 9)",
        "options": [
          "156",
          "78",
          "73",
          "83"
        ],
        "answer": "78",
        "explanation": "Read the value directly from the y-axis of the bar graph."
      },
      {
        "question": "In a bar graph, the bar for 'Apples' reaches 84. How many apples are there? (Question 10)",
        "options": [
          "84",
          "89",
          "168",
          "79"
        ],
        "answer": "84",
        "explanation": "Read the value directly from the y-axis of the bar graph."
      }
    ]
  },
  {
    "id": "average",
    "title": "Average (P6)",
    "explanation": "Average (or mean) is the sum of all data values divided by the number of values. A key formula is Total = Average x Number of Items. Problems often involve changes in average when new items are added.",
    "questions": [
      {
        "question": "Find the average of 20 and 26.",
        "options": [
          "24.0",
          "23.0",
          "46",
          "22.0"
        ],
        "answer": "23.0",
        "explanation": "Average = Total sum / Number of items = (20 + 26) / 2."
      },
      {
        "question": "Find the average of 13 and 23.",
        "options": [
          "18.0",
          "36",
          "19.0",
          "17.0"
        ],
        "answer": "18.0",
        "explanation": "Average = Total sum / Number of items = (13 + 23) / 2."
      },
      {
        "question": "Find the average of 14 and 22.",
        "options": [
          "18.0",
          "19.0",
          "17.0",
          "36"
        ],
        "answer": "18.0",
        "explanation": "Average = Total sum / Number of items = (14 + 22) / 2."
      },
      {
        "question": "Find the average of 15 and 23.",
        "options": [
          "18.0",
          "20.0",
          "19.0",
          "38"
        ],
        "answer": "19.0",
        "explanation": "Average = Total sum / Number of items = (15 + 23) / 2."
      },
      {
        "question": "Find the average of 11 and 22.",
        "options": [
          "15.5",
          "33",
          "16.5",
          "17.5"
        ],
        "answer": "16.5",
        "explanation": "Average = Total sum / Number of items = (11 + 22) / 2."
      },
      {
        "question": "Find the average of 12 and 26.",
        "options": [
          "18.0",
          "19.0",
          "20.0",
          "38"
        ],
        "answer": "19.0",
        "explanation": "Average = Total sum / Number of items = (12 + 26) / 2."
      },
      {
        "question": "Find the average of 18 and 26.",
        "options": [
          "23.0",
          "44",
          "22.0",
          "21.0"
        ],
        "answer": "22.0",
        "explanation": "Average = Total sum / Number of items = (18 + 26) / 2."
      },
      {
        "question": "Find the average of 11 and 26.",
        "options": [
          "18.5",
          "37",
          "17.5",
          "19.5"
        ],
        "answer": "18.5",
        "explanation": "Average = Total sum / Number of items = (11 + 26) / 2."
      },
      {
        "question": "Find the average of 15 and 26.",
        "options": [
          "41",
          "20.5",
          "21.5",
          "19.5"
        ],
        "answer": "20.5",
        "explanation": "Average = Total sum / Number of items = (15 + 26) / 2."
      },
      {
        "question": "Find the average of 14 and 27.",
        "options": [
          "19.5",
          "21.5",
          "20.5",
          "41"
        ],
        "answer": "20.5",
        "explanation": "Average = Total sum / Number of items = (14 + 27) / 2."
      }
    ]
  },
  {
    "id": "pie-charts",
    "title": "Pie Charts",
    "explanation": "A pie chart represents data in a circle, where the whole circle is 100% or 360 degrees. You must interpret the fractions or percentages represented by each sector to find specific quantities.",
    "questions": [
      {
        "question": "A sector in a pie chart represents 75/100 of the whole. What percentage is this? (Question 1)",
        "options": [
          "75%",
          "70%",
          "80%",
          "100%"
        ],
        "answer": "75%",
        "explanation": "A fraction with a denominator of 100 is directly equal to that percentage."
      },
      {
        "question": "A sector in a pie chart represents 75/100 of the whole. What percentage is this? (Question 2)",
        "options": [
          "80%",
          "75%",
          "100%",
          "70%"
        ],
        "answer": "75%",
        "explanation": "A fraction with a denominator of 100 is directly equal to that percentage."
      },
      {
        "question": "A sector in a pie chart represents 25/100 of the whole. What percentage is this? (Question 3)",
        "options": [
          "30%",
          "20%",
          "25%",
          "100%"
        ],
        "answer": "25%",
        "explanation": "A fraction with a denominator of 100 is directly equal to that percentage."
      },
      {
        "question": "A sector in a pie chart represents 25/100 of the whole. What percentage is this? (Question 4)",
        "options": [
          "30%",
          "20%",
          "100%",
          "25%"
        ],
        "answer": "25%",
        "explanation": "A fraction with a denominator of 100 is directly equal to that percentage."
      },
      {
        "question": "A sector in a pie chart represents 75/100 of the whole. What percentage is this? (Question 5)",
        "options": [
          "100%",
          "80%",
          "75%",
          "70%"
        ],
        "answer": "75%",
        "explanation": "A fraction with a denominator of 100 is directly equal to that percentage."
      },
      {
        "question": "A sector in a pie chart represents 25/100 of the whole. What percentage is this? (Question 6)",
        "options": [
          "30%",
          "25%",
          "100%",
          "20%"
        ],
        "answer": "25%",
        "explanation": "A fraction with a denominator of 100 is directly equal to that percentage."
      },
      {
        "question": "A sector in a pie chart represents 50/100 of the whole. What percentage is this? (Question 7)",
        "options": [
          "55%",
          "100%",
          "45%",
          "50%"
        ],
        "answer": "50%",
        "explanation": "A fraction with a denominator of 100 is directly equal to that percentage."
      },
      {
        "question": "A sector in a pie chart represents 75/100 of the whole. What percentage is this? (Question 8)",
        "options": [
          "70%",
          "75%",
          "80%",
          "100%"
        ],
        "answer": "75%",
        "explanation": "A fraction with a denominator of 100 is directly equal to that percentage."
      },
      {
        "question": "A sector in a pie chart represents 75/100 of the whole. What percentage is this? (Question 9)",
        "options": [
          "100%",
          "80%",
          "75%",
          "70%"
        ],
        "answer": "75%",
        "explanation": "A fraction with a denominator of 100 is directly equal to that percentage."
      },
      {
        "question": "A sector in a pie chart represents 50/100 of the whole. What percentage is this? (Question 10)",
        "options": [
          "45%",
          "50%",
          "55%",
          "100%"
        ],
        "answer": "50%",
        "explanation": "A fraction with a denominator of 100 is directly equal to that percentage."
      }
    ]
  },
];
