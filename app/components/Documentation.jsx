// components/Documentation.js

import { motion } from "framer-motion";

const Documentation = () => {
  return (
    <motion.div
      className="mt-12 p-8 bg-white rounded-lg shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Full Documentation</h2>
      
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">1. Introduction</h3>
        <p className="mb-4">
          <strong>Hashem Hasan Data Sorter</strong> is a sophisticated web application developed using **Next.js** and **Tailwind CSS**. This project serves as a practical demonstration of the **Selection Sort** algorithm, tailored specifically for the **Designing and Analyzing Algorithms** course instructed by **Dr. Mazen Zioud**.
        </p>
        <p>
          The application fetches user data from the [DummyJSON Users API](https://dummyjson.com/users), allowing users to interactively sort this data based on various attributes such as weight and height. Furthermore, it calculates and visualizes the percentage of users who fall into the overweight category based on the Body Mass Index (BMI) formula.
        </p>
      </section>
      
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">2. Project Objectives</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Algorithm Implementation:</strong> To implement the Selection Sort algorithm in JavaScript and analyze its performance on real-world data.
          </li>
          <li>
            <strong>Data Manipulation:</strong> To fetch, display, and allow modifications to user data from an external API.
          </li>
          <li>
            <strong>Data Visualization:</strong> To calculate the overweight percentage of users and represent this data visually using charts.
          </li>
          <li>
            <strong>User Interaction:</strong> To create an intuitive and interactive user interface that enhances the learning experience.
          </li>
          <li>
            <strong>Professional Documentation:</strong> To document the project comprehensively, detailing its functionalities, technologies used, and the underlying algorithmic concepts.
          </li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">3. Features</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Data Fetching:</strong> Retrieves user data from the DummyJSON API upon initialization.
          </li>
          <li>
            <strong>Editable Input:</strong> Presents the fetched data in an editable JSON format, allowing users to modify entries as needed.
          </li>
          <li>
            <strong>Dynamic Sorting:</strong> Enables sorting of data based on selected criteria (weight or height) using the Selection Sort algorithm.
          </li>
          <li>
            <strong>Overweight Calculation:</strong> Computes the percentage of users who are overweight based on the BMI formula, categorizing users with a BMI of 25 or higher as overweight.
          </li>
          <li>
            <strong>Data Visualization:</strong> Displays the overweight percentage through an interactive bar chart, enhancing data comprehension.
          </li>
          <li>
            <strong>Interactive Tooltip:</strong> Provides an on-hover tooltip that reveals the JavaScript code used for the Selection Sort algorithm, fostering transparency and educational value.
          </li>
          <li>
            <strong>Responsive Design:</strong> Ensures optimal viewing and interaction across various device sizes through responsive layouts.
          </li>
          <li>
            <strong>Animations:</strong> Incorporates smooth animations using Framer Motion to improve user engagement and interface fluidity.
          </li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">4. Technologies Used</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Next.js:</strong> A robust React framework facilitating server-side rendering and static site generation, enhancing performance and SEO.
          </li>
          <li>
            <strong>Tailwind CSS:</strong> A utility-first CSS framework that enables rapid UI development with minimal custom CSS.
          </li>
          <li>
            <strong>Framer Motion:</strong> A powerful library for implementing animations and transitions, contributing to a dynamic user experience.
          </li>
          <li>
            <strong>Chart.js & react-chartjs-2:</strong> Libraries for creating responsive and interactive charts, essential for data visualization.
          </li>
          <li>
            <strong>JavaScript:</strong> The core programming language used to implement the Selection Sort algorithm and handle data processing.
          </li>
          <li>
            <strong>DummyJSON Users API:</strong> An external API providing dummy user data for testing and demonstration purposes.
          </li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">5. How It Works</h3>
        <ol className="list-decimal list-inside space-y-3">
          <li>
            <strong>Data Acquisition:</strong> Upon loading, the application fetches a set of user data from the DummyJSON Users API. This data includes attributes like weight and height, which are essential for sorting and BMI calculations.
          </li>
          <li>
            <strong>Data Presentation:</strong> The fetched data is displayed in an editable textarea on the left side of the interface. Users can review and modify this data directly within the application.
          </li>
          <li>
            <strong>Sorting Mechanism:</strong> Users can select a sorting criterion—either weight or height—from a dropdown menu. Upon clicking the "Sort Data" button, the Selection Sort algorithm processes the data based on the chosen attribute.
          </li>
          <li>
            <strong>Displaying Sorted Data:</strong> The sorted data is then presented in a read-only textarea on the right side, allowing users to compare it with the original input.
          </li>
          <li>
            <strong>Overweight Calculation:</strong> After sorting, the application calculates the percentage of users who are overweight. This is determined using the BMI formula:
            <br />
            <span className="italic">
              BMI = weight (kg) / (height (m))²
            </span>
            <br />
            Users with a BMI of 25 or higher are classified as overweight.
          </li>
          <li>
            <strong>Data Visualization:</strong> The calculated overweight percentage is visualized using a bar chart, providing a clear and immediate understanding of the data distribution.
          </li>
          <li>
            <strong>Interactive Code Insight:</strong> Hovering over the "Used JavaScript Code" text in the header reveals the actual JavaScript implementation of the Selection Sort algorithm, offering educational transparency.
          </li>
          <li>
            <strong>Responsive and Interactive UI:</strong> The application leverages Tailwind CSS for styling and Framer Motion for animations, ensuring a responsive and engaging user interface across all devices.
          </li>
        </ol>
      </section>
      
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">6. Algorithm Analysis</h3>
        <p className="mb-4">
          The **Selection Sort** algorithm is a fundamental sorting technique in computer science. It operates by repeatedly selecting the smallest (or largest, depending on sorting order) element from the unsorted portion of the list and moving it to the sorted portion.
        </p>
        <p className="mb-4">
          <strong>Time Complexity:</strong> O(n²) in all cases (best, average, and worst).
        </p>
        <p className="mb-4">
          <strong>Space Complexity:</strong> O(1) as it performs sorting in place without requiring additional storage.
        </p>
        <p>
          Despite its simplicity, Selection Sort is inefficient on large datasets compared to more advanced algorithms like Quick Sort or Merge Sort. However, it serves as an excellent educational tool for understanding basic sorting mechanics and algorithm analysis.
        </p>
      </section>
      
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">7. Implementation Details</h3>
        <p className="mb-4">
          The Selection Sort algorithm is implemented in JavaScript, adhering to the following steps:
        </p>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>Initialization:</strong> Start with the first element of the array as the minimum.
          </li>
          <li>
            <strong>Finding the Minimum:</strong> Iterate through the unsorted portion of the array to find the smallest element.
          </li>
          <li>
            <strong>Swapping:</strong> Swap the found minimum element with the first unsorted element.
          </li>
          <li>
            <strong>Iteration:</strong> Move the boundary of the sorted portion one element forward and repeat the process until the entire array is sorted.
          </li>
        </ol>
        <p className="mt-4">
          The interactive tooltip feature in the application allows users to view the exact JavaScript code used for this algorithm, enhancing understanding and transparency.
        </p>
      </section>
      
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">8. Conclusion</h3>
        <p className="mb-4">
          The **Hashem Hasan Data Sorter** project encapsulates essential concepts from the **Designing and Analyzing Algorithms** course, providing a hands-on experience in implementing, analyzing, and visualizing algorithms. By integrating data manipulation, sorting mechanisms, and data visualization within a responsive web application, this project bridges theoretical knowledge with practical application.
        </p>
        <p>
          Under the mentorship of **Dr. Mazen Zioud**, this project not only reinforces algorithmic understanding but also hones skills in web development and data visualization, preparing students for more complex challenges in the realm of computer science and software engineering.
        </p>
      </section>
      
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">9. Future Enhancements</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Additional Sorting Algorithms:</strong> Implement and compare other sorting algorithms like Quick Sort, Merge Sort, and Bubble Sort to provide a broader perspective on algorithm efficiency.
          </li>
          <li>
            <strong>Performance Metrics:</strong> Incorporate real-time performance metrics such as execution time and memory usage for each sorting operation.
          </li>
          <li>
            <strong>User Authentication:</strong> Allow users to save their sorted datasets and revisit them later through a user authentication system.
          </li>
          <li>
            <strong>Enhanced Data Visualization:</strong> Utilize more advanced charting libraries or interactive visualizations to represent data insights comprehensively.
          </li>
          <li>
            <strong>Accessibility Improvements:</strong> Ensure the application adheres to accessibility standards, making it usable for individuals with disabilities.
          </li>
          <li>
            <strong>Mobile Optimization:</strong> Further optimize the application's responsiveness and usability on mobile devices.
          </li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">10. Acknowledgments</h3>
        <p>
          Special thanks to **Dr. Mazen Zioud** for his invaluable guidance and support throughout the course. His expertise in algorithm design and analysis has been instrumental in shaping the educational objectives and implementation strategies of this application.
        </p>
      </section>
      
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">11. Contact Information</h3>
        <p>
          For any inquiries, feedback, or further discussions related to this project, please feel free to reach out:
        </p>
        <ul className="list-none mt-2 space-y-2">
          <li><strong>Email:</strong> <a href="mailto:hashem.hasan@example.com" className="text-blue-500 underline">cozlgames@gmail.com</a></li>
          <li><strong>GitHub:</strong> <a href="https://github.com/hashemhasan" className="text-blue-500 underline">https://github.com/Hashem-Hasan</a></li>
        </ul>
      </section>
    </motion.div>
  );
};

export default Documentation;
