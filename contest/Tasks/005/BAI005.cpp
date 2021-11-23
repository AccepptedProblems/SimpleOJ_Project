#include <bits/stdc++.h>
#define maxn 1003
#define maxc 1000000003

using namespace std;

int SOLVE1(int n)
{
    int ans = 0;
    while(n > 1)
    {
        ans += n / 2;
        if(n % 2)   n = n / 2 + 1;
        else    n = n / 2;
    }
    return ans;
}

int SOLVE2(int n)
{
    int ans = 0;
    while(n > 1)
    {
        ans += n / 2;
        n = n / 2;
    }
    return ans;
}

int main()
{
    freopen("inp.txt", "r", stdin);
    freopen("out.txt", "w", stdout);
    int n;
    cin >> n;
    cout << SOLVE1(n) << " " << SOLVE2(n);
}
