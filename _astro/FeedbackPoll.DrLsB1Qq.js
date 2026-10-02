import{n as e,t}from"./react.DJY1zw8Z.js";var n=e((e=>{var t=Symbol.for(`react.transitional.element`);function n(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.jsx=n,e.jsxs=n})),r=e(((e,t)=>{t.exports=n()})),i=t(),a=r();function o({endpointUrl:e=`/api/feedback`}){let[t,n]=(0,i.useState)(null),[r,o]=(0,i.useState)(``),[s,c]=(0,i.useState)(!1),[l,u]=(0,i.useState)(!1);return s?(0,a.jsxs)(`div`,{className:`poll-card thank-you`,children:[(0,a.jsx)(`div`,{className:`heart-icon`,children:`🤎`}),(0,a.jsx)(`h3`,{children:`Thank you for your feedback!`}),(0,a.jsx)(`p`,{children:`Your input helps us keep making Copperwheats better every day.`})]}):(0,a.jsxs)(`div`,{className:`poll-card`,children:[(0,a.jsx)(`h3`,{className:`poll-title`,children:`How was your visit today?`}),(0,a.jsx)(`p`,{className:`poll-subtitle`,children:`Quick 10-second feedback`}),(0,a.jsxs)(`form`,{onSubmit:async e=>{if(e.preventDefault(),t){u(!0);try{await new Promise(e=>setTimeout(e,600)),c(!0)}catch(e){console.error(`Failed to submit poll`,e)}finally{u(!1)}}},children:[(0,a.jsx)(`div`,{className:`rating-row`,children:[1,2,3,4,5].map(e=>(0,a.jsx)(`button`,{type:`button`,className:`rating-btn ${t===e?`active`:``}`,onClick:()=>n(e),"aria-label":`Rate ${e} out of 5`,children:`★`},e))}),t&&(0,a.jsxs)(`div`,{className:`category-section`,children:[(0,a.jsx)(`p`,{className:`category-label`,children:`What stood out the most?`}),(0,a.jsx)(`div`,{className:`chip-group`,children:[{value:`coffee`,label:`☕ Coffee Quality`},{value:`service`,label:`😊 Friendly Staff`},{value:`atmosphere`,label:`🛋️ Cozy Vibe`},{value:`pastries`,label:`🥐 Fresh Baked Goods`}].map(e=>(0,a.jsx)(`button`,{type:`button`,className:`chip-btn ${r===e.value?`selected`:``}`,onClick:()=>o(e.value),children:e.label},e.value))}),(0,a.jsx)(`button`,{type:`submit`,className:`submit-btn`,disabled:l,children:l?`Sending...`:`Submit Feedback`})]})]}),(0,a.jsx)(`style`,{children:`
        .poll-card {
          background-color: var(--color-background, #FAF6F0);
          border: 1px solid rgba(140, 106, 80, 0.2);
          border-radius: 16px;
          padding: 1.5rem;
          max-width: 480px;
          margin: 2rem auto;
          box-shadow: 0 4px 15px rgba(44, 26, 17, 0.05);
          text-align: center;
          font-family: inherit;
        }

        .poll-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--color-text-dark, #2C1A11);
          margin: 0 0 0.25rem 0;
        }

        .poll-subtitle {
          font-size: 0.875rem;
          color: var(--color-mid-neutral, #8C6A50);
          margin-bottom: 1.25rem;
        }

        .rating-row {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .rating-btn {
          background: none;
          border: 1px solid rgba(140, 106, 80, 0.2);
          border-radius: 8px;
          font-size: 1.5rem;
          color: rgba(140, 106, 80, 0.3);
          cursor: pointer;
          padding: 0.4rem 0.6rem;
          transition: all 0.2s ease;
        }

        .rating-btn.active, .rating-btn:hover {
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.1);
          border-color: #f59e0b;
        }

        .category-section {
          animation: fadeIn 0.3s ease;
        }

        .category-label {
          font-size: 0.9rem;
          color: var(--color-dark-neutral, #4A3525);
          margin-bottom: 0.75rem;
        }

        .chip-group {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .chip-btn {
          background: #ffffff;
          border: 1px solid rgba(140, 106, 80, 0.25);
          border-radius: 20px;
          padding: 0.4rem 0.85rem;
          font-size: 0.85rem;
          color: #4A3525;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .chip-btn.selected {
          background: #2C1A11;
          color: #FAF6F0;
          border-color: #2C1A11;
        }

        .submit-btn {
          width: 100%;
          background-color: #b45309;
          color: white;
          border: none;
          padding: 0.75rem;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .thank-you .heart-icon {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `})]})}export{o as default};