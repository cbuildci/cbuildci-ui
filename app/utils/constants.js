export const PHASE_TYPES = [
    'SUBMITTED',
    'PROVISIONING',
    'DOWNLOAD_SOURCE',
    'INSTALL',
    'PRE_BUILD',
    'BUILD',
    'POST_BUILD',
    'UPLOAD_ARTIFACTS',
    'FINALIZING',
    'COMPLETED',
];

if (process.env.NODE_ENV !== 'production') {
    Object.freeze(PHASE_TYPES);
}
