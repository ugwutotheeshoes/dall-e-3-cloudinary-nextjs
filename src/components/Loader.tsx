import React from 'react'

export default function Loader({ size = 20 }) {
    return (
        <div className="flex justify-center items-center">
          <div className="spinner" style={{ width: `${size}px`, height: `${size}px` }}>
          </div>
        </div>
      );
}
