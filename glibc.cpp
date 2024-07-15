// Part of iq.OpenGenus.org
#include <stdio.h>
#include <stdlib.h>
#include <gnu/libc-version.h>

int main(int argc, char *argv[])
{
    // Print glibc version
    printf("GNU libc version: %s\n", gnu_get_libc_version());
    exit(EXIT_SUCCESS);
}