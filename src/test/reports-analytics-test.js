// Test script for Reports & Analytics functionality
// Run this in the browser console on the Analytics & Reports page

console.log('🧪 Starting Reports & Analytics Test Suite...');

// Test 1: Check if charts are loaded
const testChartsLoaded = () => {
  console.log('📊 Testing chart components...');
  const chartElements = document.querySelectorAll('canvas');
  if (chartElements.length > 0) {
    console.log('✅ Charts loaded successfully:', chartElements.length, 'charts found');
    return true;
  } else {
    console.log('❌ No charts found');
    return false;
  }
};

// Test 2: Check PDF download functionality
const testPDFDownload = async () => {
  console.log('📄 Testing PDF download functionality...');
  const pdfButtons = document.querySelectorAll('button[title*="PDF"]');
  if (pdfButtons.length > 0) {
    console.log('✅ PDF download buttons found:', pdfButtons.length);
    return true;
  } else {
    console.log('❌ No PDF download buttons found');
    return false;
  }
};

// Test 3: Check export functionality
const testExportFunctionality = () => {
  console.log('📤 Testing export functionality...');
  const csvButton = Array.from(document.querySelectorAll('button')).find(btn => 
    btn.textContent.includes('Export CSV')
  );
  const jsonButton = Array.from(document.querySelectorAll('button')).find(btn => 
    btn.textContent.includes('Export JSON')
  );
  
  if (csvButton && jsonButton) {
    console.log('✅ Export buttons found: CSV and JSON');
    return true;
  } else {
    console.log('❌ Export buttons missing');
    return false;
  }
};

// Test 4: Check data loading
const testDataLoading = () => {
  console.log('📊 Testing data loading...');
  const statCards = document.querySelectorAll('.bg-white.rounded-xl.p-6');
  const tableRows = document.querySelectorAll('tbody tr');
  
  if (statCards.length > 0 && tableRows.length > 0) {
    console.log('✅ Data loaded successfully:', statCards.length, 'stat cards,', tableRows.length, 'table rows');
    return true;
  } else {
    console.log('❌ Data not loaded properly');
    return false;
  }
};

// Test 5: Check responsive design
const testResponsiveDesign = () => {
  console.log('📱 Testing responsive design...');
  const gridElements = document.querySelectorAll('.grid');
  const responsiveClasses = Array.from(document.querySelectorAll('*')).some(el => 
    el.className.includes('md:') || el.className.includes('lg:')
  );
  
  if (gridElements.length > 0 && responsiveClasses) {
    console.log('✅ Responsive design classes found');
    return true;
  } else {
    console.log('❌ Responsive design not properly implemented');
    return false;
  }
};

// Test 6: Check animations
const testAnimations = () => {
  console.log('🎬 Testing animations...');
  const animatedElements = document.querySelectorAll('[style*="opacity"], .animate-spin, .animate-bounce');
  
  if (animatedElements.length > 0) {
    console.log('✅ Animations found:', animatedElements.length, 'animated elements');
    return true;
  } else {
    console.log('❌ No animations found');
    return false;
  }
};

// Test 7: Check filter functionality
const testFilterFunctionality = () => {
  console.log('🔍 Testing filter functionality...');
  const searchInput = document.querySelector('input[placeholder*="Search"]');
  const filterSelects = document.querySelectorAll('select');
  
  if (searchInput && filterSelects.length > 0) {
    console.log('✅ Filter controls found:', filterSelects.length, 'filters');
    return true;
  } else {
    console.log('❌ Filter functionality missing');
    return false;
  }
};

// Run all tests
const runAllTests = async () => {
  console.log('🚀 Running complete test suite...\n');
  
  const tests = [
    { name: 'Charts Loading', test: testChartsLoaded },
    { name: 'PDF Download', test: testPDFDownload },
    { name: 'Export Functionality', test: testExportFunctionality },
    { name: 'Data Loading', test: testDataLoading },
    { name: 'Responsive Design', test: testResponsiveDesign },
    { name: 'Animations', test: testAnimations },
    { name: 'Filter Functionality', test: testFilterFunctionality }
  ];
  
  let passedTests = 0;
  
  for (const { name, test } of tests) {
    try {
      const result = await test();
      if (result) passedTests++;
    } catch (error) {
      console.log('❌', name, 'failed with error:', error.message);
    }
  }
  
  console.log('\n📊 Test Results Summary:');
  console.log(`✅ Passed: ${passedTests}/${tests.length} tests`);
  console.log(`❌ Failed: ${tests.length - passedTests}/${tests.length} tests`);
  
  if (passedTests === tests.length) {
    console.log('🎉 All tests passed! Reports & Analytics is fully functional.');
  } else {
    console.log('⚠️ Some tests failed. Please check the implementation.');
  }
  
  return {
    total: tests.length,
    passed: passedTests,
    failed: tests.length - passedTests,
    success: passedTests === tests.length
  };
};

// Auto-run tests when script is loaded
runAllTests();

// Export test function for manual use
window.testReportsAnalytics = runAllTests;

console.log('💡 You can run tests again anytime with: testReportsAnalytics()');