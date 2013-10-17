#define LOG_LEVEL_NONE 0
#define LOG_LEVEL_DEBUG 1
#define LOG_LEVEL_INFO 2
#define LOG_LEVEL_VERBOSE 3

#if LOG_LEVEL >= LOG_LEVEL_DEBUG
  #define LOG(format, args...)  console.log(format, ##args)
#else
  #define LOG(...)
#endif

#if LOG_LEVEL >= LOG_LEVEL_INFO
  #define LOG_INFO(format, args...)  console.log(format, ##args)
#else
  #define LOG_INFO(...)
#endif

#if LOG_LEVEL >= LOG_LEVEL_VERBOSE
  #define LOG_VERBOSE(format, args...)  console.log(format, ##args)
#else
  #define LOG_VERBOSE(...)
#endif
