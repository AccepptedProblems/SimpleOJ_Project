//Dai Ca Di Hoc
#include <iostream>
#include <cstdlib>
#include <cmath>
#include <iomanip>
#include <cstring>
#include <fstream>
#include <algorithm>
#include <queue>
#include <utility>
#include <vector>
#include <windows.h>
#include <direct.h>
#define FOR(i,a,b) for(int i = (a); i <= (b); i++)
#define FORD(i,a,b) for(int i = (a); i >= (b); i--)
#define N 1003
#define maxc 1000000003


using namespace std;

ofstream fi;
char Name_file[] = "";
char exe_file[100] = "";
char inp_file[100] = "";
char out_file[100] = "";
string folder = "Test00";
int n, a[N];

int random(int x)
{
    long long u = rand() % maxc;
    long long v = rand() % maxc;
    long long k = rand() % maxc;
    return ((u*v+k) % x + 1);
}


long long random(long long x)
{
    int u = random(1000000000);
    int v = random(1000000000);
    int k = random(1000000000);
    return ((1ll*u*v+k)%x)+1;
}

void make_test( int test)
{
    int n = random(test * 10) + random(2);
    fi << n << endl;
    if(n % 2)
        for(int i=1; i<=n; i++)
            fi << i * n << " ";
    else
    {
        for(int i=1; i<=n/2; i++)
            fi << i * n << " ";
        for(int i=1; i<=n/2; i++)
            fi << random(n) + n * n << " ";
    }
}

void run_answer()
{
    system(exe_file);
}

void Rename_file(int test)
{
    folder[4] = test/10 + 48;
    folder[5] = test%10 + 48;
    mkdir(&folder[0]);
    string output_path = folder + "\\" + inp_file;
    CopyFile(inp_file, &output_path[0], false);
    output_path = folder + "\\" + out_file;
    CopyFile(out_file, &output_path[0], false);
}

void Make_file_name()
{
    strcpy(exe_file,Name_file);
    strcpy(inp_file,Name_file);
    strcpy(out_file,Name_file);

    strcat(exe_file,"BAI010.exe");
    strcat(inp_file,"inp.txt");
    strcat(out_file,"out.txt");

}

int main()
{
    Make_file_name();
    FOR(test,1,10)
    {
        cout << test << endl;
        fi.open(inp_file);
        make_test(test);
        fi.close();
        run_answer();
        Rename_file(test);
    }
    DeleteFile(inp_file);
    DeleteFile(out_file);
    return 0;
}