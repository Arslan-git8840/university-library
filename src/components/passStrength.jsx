import React from 'react';

function PasswordStrength({ strength }) {
    let barClasses = [];

    // Use a switch statement to set the bar classes based on strength
    switch (strength) {
        case 1:
            barClasses = [
                'bg-red-500',     // Weak
                'bg-gray-300',    // Fair
                'bg-gray-300',    // Good
                'bg-gray-300',    // Strong
            ];
            break;
        case 2:
            barClasses = [
                'bg-orange-500',  // Weak
                'bg-orange-500',  // Fair
                'bg-gray-300',    // Good
                'bg-gray-300',    // Strong
            ];
            break;
        case 3:
            barClasses = [
                'bg-yellow-500',  // Weak
                'bg-yellow-500',  // Fair
                'bg-yellow-500',  // Good
                'bg-gray-300',    // Strong
            ];
            break;
        case 4:
            barClasses = [
                'bg-green-500',   // Weak
                'bg-green-500',   // Fair
                'bg-green-500',   // Good
                'bg-green-500',   // Strong
            ];
            break;
        default:
            barClasses = [
                'bg-gray-300',    // No strength
                'bg-gray-300',
                'bg-gray-300',
                'bg-gray-300',
            ];
            break;
    }

    return (

        <div className='w-full flex space-x-3 mt-4'>
            <div className={`h-2 w-1/4 ${barClasses[0]} rounded-lg`}></div>
            <div className={`h-2 w-1/4 ${barClasses[1]} rounded-lg`}></div>
            <div className={`h-2 w-1/4 ${barClasses[2]} rounded-lg`}></div>
            <div className={`h-2 w-1/4 ${barClasses[3]} rounded-lg`}></div>
        </div>

    );

}

export default PasswordStrength;
