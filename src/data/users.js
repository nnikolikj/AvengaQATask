module.exports = [
    { username: 'standard_user', shouldSucceed: true },
    { username: 'locked_out_user', shouldSucceed: false },
    { username: 'problem_user', shouldSucceed: true },
    { username: 'performance_glitch_user', shouldSucceed: true },
    { username: 'error_user', shouldSucceed: true },
    { username: 'visual_user', shouldSucceed: true },
];
